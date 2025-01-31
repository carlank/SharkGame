SharkGame.PlayerResources = new Map();
SharkGame.PlayerIncomeTable = new Map();
SharkGame.ResourceMap = new Map();

SharkGame.Resources = {
    INCOME_COLOR: "#808080",
    TOTAL_INCOME_COLOR: "#A0A0A0",
    UPGRADE_MULTIPLIER_COLOR: "#606060",
    BOOST_MULTIPLIER_COLOR: "#60A060",
    WORLD_MULTIPLIER_COLOR: "#6060A0",
    ARTIFACT_MULTIPLIER_COLOR: "#6F968A",
    RESOURCE_AFFECT_MULTIPLIER_COLOR: "#BFBF5A",

    specialMultiplier: null,
    rebuildTable: false,

    init() {
        // set all the amounts and total amounts of resources to 0
        $.each(SharkGame.ResourceTable, (k, v) => {
            SharkGame.ResourceMap.set(k, v);
        });

        SharkGame.ResourceMap.forEach((v, k, m) => {
            SharkGame.PlayerResources.set(k, {
                amount: 0,
                totalAmount: 0,
                incomeMultiplier: 1,
            });
        });

        // populate income table with an entry for each resource!!
        SharkGame.ResourceMap.forEach((v, k, m) => {
            SharkGame.PlayerIncomeTable.set(k, 0);
        });

        SharkGame.Resources.specialMultiplier = 1;
        SharkGame.Resources.buildIncomeNetwork();
    },

    processIncomes(timeDelta, debug) {
        if (!debug && timeDelta > 51) {
            for (let i = 0; i < 50; i++) {
                SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
                    if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                        SharkGame.Resources.changeResource(k, v);
                    } else {
                        SharkGame.Resources.changeResource(k, v);
                    }
                });
                SharkGame.Resources.recalculateIncomeTable();
                timeDelta -= 1;
            }
            if (timeDelta > 172800) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta, timeDelta / 1728, 50000);
            }
            if (timeDelta > 43200) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta, 100, 8000);
            }
            if (timeDelta > 7200) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta, 75, 2250);
            }
            if (timeDelta > 2000) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta, 40, 500);
            }
            if (timeDelta > 50) {
                timeDelta = SharkGame.Resources.doRKMethod(timeDelta, 20, 50);
            }
        }
        while (timeDelta > 1) {
            SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
                if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v);
                } else {
                    SharkGame.Resources.changeResource(k, v);
                }
            });
            SharkGame.Resources.recalculateIncomeTable();
            timeDelta -= 1;
        }
        SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
            if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                SharkGame.Resources.changeResource(k, v * timeDelta);
            } else {
                SharkGame.Resources.changeResource(k, v);
            }
        });
    },

    doRKMethod(time, h, stop) {
        const r = SharkGame.Resources;
        const w = SharkGame.World;

        let originalResources;
        let originalIncomes;
        let stepTwoIncomes;
        let stepThreeIncomes;
        let stepFourIncomes;

        while (time > stop) {
            originalResources = _.cloneDeep(SharkGame.PlayerResources);
            originalIncomes = _.cloneDeep(SharkGame.PlayerIncomeTable);

            SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
                if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, (v * h) / 2, true);
                }
            });

            r.recalculateIncomeTable();
            stepTwoIncomes = _.cloneDeep(SharkGame.PlayerIncomeTable);

            SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
                if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, (v * h) / 2, true);
                }
            });

            r.recalculateIncomeTable();
            stepThreeIncomes = _.cloneDeep(SharkGame.PlayerIncomeTable);

            SharkGame.PlayerIncomeTable.forEach((v, k, m) => {
                if (!SharkGame.ResourceSpecialProperties.timeImmune.includes(k)) {
                    SharkGame.Resources.changeResource(k, v * h, true);
                }
            });

            r.recalculateIncomeTable();
            stepFourIncomes = _.cloneDeep(SharkGame.PlayerIncomeTable);
            SharkGame.PlayerResources = _.cloneDeep(originalResources);

            SharkGame.PlayerIncomeTable.forEach((_object, resource, m) => {
                SharkGame.Resources.changeResource(
                    resource,
                    (h *
                        (originalIncomes.get(resource) +
                            2 * stepTwoIncomes.get(resource) +
                            2 * stepThreeIncomes.get(resource) +
                            stepFourIncomes.get(resource))) /
                        6,
                    true
                );
            });

            r.recalculateIncomeTable();
            time -= h;
        }
        return time;
    },

    recalculateIncomeTable() {
        const r = SharkGame.Resources;
        const w = SharkGame.World;

        // clear income table first
        SharkGame.ResourceMap.forEach((v, k, m) => {
            SharkGame.PlayerIncomeTable.set(k, 0);
        });

        const worldResources = w.worldResources;

        SharkGame.ResourceMap.forEach((properties, name, m) => {
            const worldResourceInfo = worldResources.get(name);
            if (worldResourceInfo.exists) {
                // for this resource, calculate the income it generates
                if (properties.income) {
                    let costScaling = 1;
                    let changeMap = new Map();

                    $.each(properties.income, (k, v) => {
                        if (SharkGame.World.doesResourceExist(k)) {
                            changeMap.set(k, r.getProductAmountFromGeneratorResource(name, k))
                        }
                    });

                    changeMap.forEach((change, k, map) => {
                        // run over all resources first to check if costs can be met
                        // if the cost can't be taken, scale the cost and output down to feasible levels
                        if (!properties.forceIncome) {
                            if (change < 0) {
                                const resourceHeld = r.getResource(k);
                                if (resourceHeld + change <= 0) {
                                    const scaling = resourceHeld / -change;
                                    if (scaling >= 0 && scaling < 1) {
                                        // sanity checking
                                        costScaling = Math.min(costScaling, scaling);
                                    } else {
                                        costScaling = 0; // better to break this way than break explosively
                                    }
                                }
                            }
                        }
                    });

                    changeMap.forEach((change, k, map) => {
                        SharkGame.PlayerIncomeTable.set(
                            k,
                            SharkGame.PlayerIncomeTable.get(k) + change * costScaling
                        );
                    });
                }

                // calculate any world income that should be added to this resource
                if (worldResourceInfo) {
                    const worldResourceIncome = worldResourceInfo.income;
                    const affectedResourceBoostMultiplier = worldResources.get(name).boostMultiplier;
                    SharkGame.PlayerIncomeTable.set(
                        name,
                        SharkGame.PlayerIncomeTable.get(name) + worldResourceIncome * affectedResourceBoostMultiplier
                    );
                }
            }
        });
    },

    getProductAmountFromGeneratorResource(generator, product) {
        const r = SharkGame.Resources;
        const w = SharkGame.World;
        const rp = SharkGame.ResourceSpecialProperties;
        const playerResource = SharkGame.PlayerResources.get(generator);
        if (!r.getResourceCombinationAllowed(generator, product)) {
            return 0;
        }
        const generated =
            SharkGame.ResourceMap.get(generator).income[product] *
            r.getResource(generator) *
            playerResource.incomeMultiplier *
            w.getWorldIncomeMultiplier(generator) *
            w.getWorldBoostMultiplier(product) *
            w.getArtifactMultiplier(generator) *
            r.getResourceGeneratorMultiplier(generator) *
            r.getResourceIncomeMultiplier(product);
        if (rp.incomeCap[product]) {
            if (SharkGame.PlayerIncomeTable.get(product) + generated > rp.incomeCap[product]) {
                return rp.incomeCap[product] - SharkGame.PlayerIncomeTable.get(product);
            }
        }
        return generated;
    },

    getResourceGeneratorMultiplier(generator) {
        return SharkGame.Resources.getNetworkIncomeModifier(SharkGame.GeneratorIncomeAffectedApplicable, generator);
    },

    getResourceIncomeMultiplier(product) {
        return SharkGame.Resources.getNetworkIncomeModifier(SharkGame.ResourceIncomeAffectedApplicable, product);
    },

    getNetworkIncomeModifier(network, resource) {
        const node = network[resource];
        let multiplier = 1;
        if (node) {
            if (node.multiply) {
                $.each(node.multiply, (k, v) => {
                    multiplier = multiplier + v * SharkGame.Resources.getResource(k);
                });
            }
            if (node.reciprocate) {
                $.each(node.reciprocate, (k, v) => {
                    multiplier = multiplier / (1 + v * SharkGame.Resources.getResource(k));
                });
            }
            if (node.exponentiate) {
                $.each(node.exponentiate, (k, v) => {
                    multiplier = multiplier * Math.pow(v, SharkGame.Resources.getResource(k));
                });
            }
            if (node.polynomial) {
                $.each(node.polynomial, (k, v) => {
                    multiplier = multiplier + Math.pow(SharkGame.Resources.getResource(k), v);
                });
            }
        }
        return multiplier;
    },

    getResourceCombinationAllowed(generator, product) {
        return SharkGame.World.worldRestrictedCombinations.has(generator)
            ? !SharkGame.World.worldRestrictedCombinations.get(generator).includes(product)
            : true;
    },

    getSpecialMultiplier(_generator) {
        return 1;
    },

    getIncome(resource) {
        return SharkGame.PlayerIncomeTable.get(resource);
    },

    getMultiplier(resource) {
        return SharkGame.PlayerResources.get(resource).incomeMultiplier;
    },

    setMultiplier(resource, multiplier) {
        SharkGame.PlayerResources.get(resource).incomeMultiplier = multiplier;
        SharkGame.Resources.recalculateIncomeTable();
    },

    // Adds or subtracts resources based on amount given.
    changeResource(resource, amount, norecalculation) {
        if (Math.abs(amount) < SharkGame.EPSILON) {
            return; // ignore changes below epsilon
        }

        const resourceTable = SharkGame.PlayerResources.get(resource);
        const prevTotalAmount = resourceTable.totalAmount;

        if (!SharkGame.World.doesResourceExist(resource)) {
            return; // don't change resources that don't technically exist
        }

        resourceTable.amount += amount;
        if (resourceTable.amount < 0) {
            resourceTable.amount = 0;
        }

        if (amount > 0) {
            resourceTable.totalAmount += amount;
        }

        if (prevTotalAmount < SharkGame.EPSILON) {
            // we got a new resource
            SharkGame.Resources.rebuildTable = true;
        }

        if (!norecalculation) {
            SharkGame.Resources.recalculateIncomeTable();
        }
    },

    setResource(resource, newValue) {
        const resourceTable = SharkGame.PlayerResources.get(resource);

        resourceTable.amount = newValue;
        if (resourceTable.amount < 0) {
            resourceTable.amount = 0;
        }
        SharkGame.Resources.recalculateIncomeTable();
    },

    setTotalResource(resource, newValue) {
        SharkGame.PlayerResources.get(resource).totalAmount = newValue;
    },

    getResource(resource) {
        return SharkGame.PlayerResources.get(resource).amount;
    },

    getTotalResource(resource) {
        return SharkGame.PlayerResources.get(resource).totalAmount;
    },

    isCategoryVisible(category) {
        let visible = false;
        $.each(category.resources, (_, v) => {
            visible =
                visible || (SharkGame.PlayerResources.get(v).totalAmount > 0 && SharkGame.World.doesResourceExist(v));
        });
        return visible;
    },

    getCategoryOfResource(resourceName) {
        let categoryName = "";
        $.each(SharkGame.ResourceCategories, (categoryKey, categoryValue) => {
            if (categoryName !== "") {
                return;
            }
            $.each(categoryValue.resources, (k, v) => {
                if (resourceName === v) {
                    categoryName = categoryKey;
                }
            });
        });
        return categoryName;
    },

    getResourcesInCategory(categoryName) {
        const resources = [];
        $.each(SharkGame.ResourceCategories[categoryName].resources, (i, v) => {
            resources.push(v);
        });
        return resources;
    },

    isCategory(name) {
        return !(typeof SharkGame.ResourceCategories[name] === "undefined");
    },

    isInCategory(resource, category) {
        return SharkGame.ResourceCategories[category].resources.indexOf(resource) !== -1;
    },

    getBaseOfResource(resourceName) {
        // if there are super-categories/base jobs of a resource, return that, otherwise return null
        let baseResourceName = null;
        SharkGame.ResourceMap.forEach((value, key, m) => {
            if (baseResourceName) {
                return;
            }
            if (value.jobs) {
                $.each(value.jobs, (_, jobName) => {
                    if (baseResourceName) {
                        return;
                    }
                    if (jobName === resourceName) {
                        baseResourceName = key;
                    }
                });
            }
        });
        return baseResourceName;
    },

    haveAnyResources() {
        let anyResources = false;
        SharkGame.PlayerResources.forEach((v, k, m) => {
            if (!anyResources) {
                anyResources = v.totalAmount > 0;
            }
        });
        return anyResources;
    },

    // returns true if enough resources are held (>=)
    // false if they are not
    checkResources(resourceList, checkTotal) {
        let sufficientResources = true;
        SharkGame.ResourceMap.forEach((v, k, m) => {
            let currentResource;
            if (!checkTotal) {
                currentResource = SharkGame.Resources.getResource(k);
            } else {
                currentResource = SharkGame.Resources.getTotalResource(k);
            }
            let listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if (typeof listResource === "undefined") {
                listResource = 0;
            }
            if (currentResource < listResource) {
                sufficientResources = false;
            }
        });
        return sufficientResources;
    },

    changeManyResources(resourceList, subtract) {
        if (typeof subtract === "undefined") {
            subtract = false;
        }

        $.each(resourceList, (k, v) => {
            let amount = v;
            if (subtract) {
                amount *= -1;
            }
            SharkGame.Resources.changeResource(k, amount);
        });
    },

    scaleResourceList(resourceList, amount) {
        const newList = {};
        $.each(resourceList, (k, v) => {
            newList[k] = v * amount;
        });
        return newList;
    },

    // update values in table without adding rows
    updateResourcesTable() {
        const rTable = $("#resourceTable");
        const main = SharkGame.Main;
        const r = SharkGame.Resources;

        // if resource table does not exist, there are no resources, so do not construct table
        // if a resource became visible when it previously wasn't, reconstruct the table
        if (r.rebuildTable) {
            r.reconstructResourcesTable();
        } else {
            // loop over table rows, update values
            SharkGame.PlayerResources.forEach((v, k, m) => {
                $("#amount-" + k).html(main.beautify(v.amount, true));

                const income = r.getIncome(k);
                if (Math.abs(income) > SharkGame.EPSILON) {
                    const changeChar = income > 0 ? "+" : "";
                    $("#income-" + k).html(
                        "<span style='color:" +
                            r.INCOME_COLOR +
                            "'>" +
                            changeChar +
                            main.beautify(income, false, 2) +
                            "/s</span>"
                    );
                } else {
                    $("#income-" + k).html("");
                }
            });
        }
    },

    // add rows to table (more expensive than updating existing DOM elements)
    reconstructResourcesTable() {
        let rTable = $("#resourceTable");
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const w = SharkGame.World;

        const statusDiv = $("#status");
        // if resource table does not exist, create
        if (rTable.length <= 0) {
            statusDiv.prepend("<h3>Stuff</h3>");
            const tableContainer = $("<div>").attr("id", "resourceTableContainer");
            tableContainer.append($("<table>").attr("id", "resourceTable"));
            statusDiv.append(tableContainer);
            rTable = $("#resourceTable");
        }

        // remove the table contents entirely
        rTable.empty();

        let anyResourcesInTable = false;

        if (SharkGame.Settings.current.groupResources) {
            $.each(SharkGame.ResourceCategories, (_, category) => {
                if (r.isCategoryVisible(category)) {
                    const headerRow = $("<tr>").append(
                        $("<td>").attr("colSpan", 3).append($("<h3>").html(category.name))
                    );
                    rTable.append(headerRow);
                    $.each(category.resources, (k, v) => {
                        if (r.getTotalResource(v) > 0) {
                            const row = r.constructResourceTableRow(v);
                            rTable.append(row);
                            anyResourcesInTable = true;
                        }
                    });
                }
            });
        } else {
            // iterate through data, if total amount > 0 add a row
            SharkGame.ResourceMap.forEach((v, key, _map) => {
                if (r.getTotalResource(key) > 0 && w.doesResourceExist(key)) {
                    const row = r.constructResourceTableRow(key);
                    rTable.append(row);
                    anyResourcesInTable = true;
                }
            });
        }

        // if the table is still empty, hide the status div
        // otherwise show it
        if (!anyResourcesInTable) {
            statusDiv.hide();
        } else {
            statusDiv.show();
        }

        r.rebuildTable = false;
    },

    constructResourceTableRow(resourceKey) {
        const m = SharkGame.Main;
        const r = SharkGame.Resources;
        const k = resourceKey;
        const v = SharkGame.ResourceMap.get(k);
        const pr = SharkGame.PlayerResources.get(k);
        const income = r.getIncome(k);
        const row = $("<tr>");
        if (pr.totalAmount > 0) {
            row.append(
                $("<td>")
                    .attr("id", "resource-" + k)
                    .html(SharkGame.Resources.getResourceName(k))
            );

            row.append(
                $("<td>")
                    .attr("id", "amount-" + k)
                    .html(m.beautify(pr.amount))
            );

            const incomeId = $("<td>").attr("id", "income-" + k);

            row.append(incomeId);

            if (Math.abs(income) > SharkGame.EPSILON) {
                const changeChar = income > 0 ? "+" : "";
                incomeId.html(
                    "<span style='color:" +
                        r.INCOME_COLOR +
                        "'>" +
                        changeChar +
                        m.beautify(income, false, 2) +
                        "/s</span>"
                );
            }
        }
        return row;
    },

    getResourceName(resourceName, darken, forceSingle) {
        const resource = SharkGame.ResourceMap.get(resourceName);
        let name =
            Math.floor(SharkGame.PlayerResources.get(resourceName).amount) - 1 < SharkGame.EPSILON || forceSingle
                ? resource.singleName
                : resource.name;

        if (SharkGame.Settings.current.colorCosts) {
            let color = resource.color;
            if (darken) {
                color = SharkGame.colorLum(resource.color, -0.5);
            }
            name = "<span class='click-passthrough' style='color:" + color + "'>" + name + "</span>";
        }
        return name;
    },

    // make a resource list object into a string describing its contents
    resourceListToString(resourceList, darken) {
        if ($.isEmptyObject(resourceList)) {
            return "";
        }
        let formattedResourceList = "";
        SharkGame.ResourceMap.forEach((v, k, m) => {
            const listResource = resourceList[k];
            // amend for unspecified resources (assume zero)
            if (listResource > 0 && SharkGame.World.doesResourceExist(k)) {
                const isSingular = Math.floor(listResource) - 1 < SharkGame.EPSILON;
                formattedResourceList += SharkGame.Main.beautify(listResource);
                formattedResourceList += " " + SharkGame.Resources.getResourceName(k, darken, isSingular) + ", ";
            }
        });
        // snip off trailing suffix
        formattedResourceList = formattedResourceList.slice(0, -2);
        return formattedResourceList;
    },

    getResourceSources(resource) {
        const sources = { income: [], actions: [] };
        // go through all incomes
        SharkGame.ResourceMap.forEach((v, k, m) => {
            if (v.income) {
                const incomeForResource = v.income[resource];
                if (incomeForResource > 0) {
                    sources.income.push(k);
                }
            }
        });
        // go through all actions
        $.each(SharkGame.HomeActions, (k, v) => {
            const resourceEffect = v.effect.resource;
            if (resourceEffect) {
                if (resourceEffect[resource] > 0) {
                    sources.actions.push(k);
                }
            }
        });
        return sources;
    },

    buildIncomeNetwork(specifically) {
        // completes the network of resources whose incomes are affected by other resources
        // takes the order of the gia and reverses it to get the rgad.

        const gia = SharkGame.GeneratorIncomeAffectors;
        const rgad = SharkGame.GeneratorIncomeAffected;
        const rc = SharkGame.ResourceCategories;
        if (!specifically) {
            // recursively parse the gia
            $.each(gia, (resource) => {
                $.each(gia[resource], (type) => {
                    $.each(gia[resource][type], (generator, value) => {
                        // check for issues worth throwing over
                        if (SharkGame.ResourceMap.get(generator)) {
                            if (!SharkGame.ResourceMap.get(generator).income) {
                                throw new Error(
                                    "Issue building income network, generator has no income, not actually a generator! Try changing resource table generators."
                                );
                            }
                        }

                        // is it a category or a generator?
                        const nodes = SharkGame.Resources.isCategory(generator) ? rc[generator].resources : [generator];

                        // recursively reconstruct the table with the keys in the inverse order
                        $.each(nodes, (k, v) => {
                            if (!rgad[v]) {
                                rgad[v] = {};
                            }
                            if (!rgad[v][type]) {
                                rgad[v][type] = {};
                            }
                            rgad[v][type][resource] = value;
                        });
                    });
                });
            });
        }

        // resources incomes below, generators above

        const ria = SharkGame.ResourceIncomeAffectors;
        const rad = SharkGame.ResourceIncomeAffected;
        if (!specifically) {
            // recursively parse the ria
            $.each(ria, (affectorResource) => {
                $.each(ria[affectorResource], (type) => {
                    $.each(ria[affectorResource][type], (affectedResource, degree) => {
                        // s: is it a category?
                        const nodes = SharkGame.Resources.isCategory(affectedResource)
                            ? rc[affectedResource].resources
                            : [affectedResource];

                        // recursively reconstruct the table with the keys in the inverse order
                        $.each(nodes, (k, v) => {
                            if (!rad[v]) {
                                rad[v] = {};
                            }
                            if (!rad[v][type]) {
                                rad[v][type] = {};
                            }
                            rad[v][type][affectorResource] = degree;
                        });
                    });
                });
            });
        }
    },

    buildApplicableNetworks() {
        // this function builds two networks that contain all actually relevant relationships for a given world
        const w = SharkGame.World;
        const apprgad = SharkGame.GeneratorIncomeAffectedApplicable;
        const apprad = SharkGame.ResourceIncomeAffectedApplicable;
        const rgad = SharkGame.GeneratorIncomeAffected;
        const rad = SharkGame.ResourceIncomeAffected;
        $.each(rgad, (generator) => {
            $.each(rgad[generator], (type) => {
                $.each(rgad[generator][type], (affector, degree) => {
                    if (w.worldResources.get(generator).exists && w.worldResources.get(affector).exists) {
                        if (!apprgad[generator]) {
                            apprgad[generator] = {};
                        }
                        if (!apprgad[generator][type]) {
                            apprgad[generator][type] = {};
                        }
                        apprgad[generator][type][affector] = degree;
                    }
                });
            });
        });
        $.each(rad, (resource) => {
            $.each(rad[resource], (type) => {
                $.each(rad[resource][type], (affector, degree) => {
                    if (w.worldResources.get(resource).exists && w.worldResources.get(affector).exists) {
                        if (!apprad[resource]) {
                            apprad[resource] = {};
                        }
                        if (!apprad[resource][type]) {
                            apprad[resource][type] = {};
                        }
                        apprad[resource][type][affector] = degree;
                    }
                });
            });
        });
    },
    
    getPurchaseAmount(resource) {
        const buy = SharkGame.Settings.current.buyAmount;
        const owned = SharkGame.Resources.getResource(resource);

        if (buy > 0) {
            return buy;
        } else {
            return Math.floor(owned / (-buy));
        }
    },

    // TESTING FUNCTIONS
    giveMeSomeOfEverything(amount) {
        SharkGame.ResourceMap.forEach((v, k, m) => {
            SharkGame.Resources.changeResource(k, amount);
        });
    },

    // this was going to be used to randomise what resources were available but it needs better work to point out what is REQUIRED and what is OPTIONAL
    // create all chains that terminate only at a cost-free action to determine how to get to a resource
    // will return a weird vaguely tree structure of nested arrays (ughhh I need to learn how to OOP in javascript at some point, what a hack)
    getResourceDependencyChains(resource, alreadyKnownList) {
        const r = SharkGame.Resources;
        const l = SharkGame.World;
        const dependencies = [];
        if (!alreadyKnownList) {
            alreadyKnownList = []; // tracks resources we've already seen, an effort to combat cyclic dependencies
        }

        const sources = r.getResourceSources(resource);
        // get resource costs for actions that directly get this
        // only care about the resource types required
        $.each(sources.actions, (_key, action) => {
            const actionCost = SharkGame.HomeActions[action].cost;
            $.each(actionCost, (k, costProp) => {
                const costResource = costProp.resource;
                if (l.doesResourceExist(costResource)) {
                    dependencies.push(costResource);
                    alreadyKnownList.push(costResource);
                }
            });
        });

        // get dependencies for income resources
        $.each(sources.income, (_, v) => {
            if (l.doesResourceExist(v)) {
                if (alreadyKnownList.indexOf(v) === -1) {
                    dependencies.push(r.getResourceDependencyChains(v, alreadyKnownList));
                }
            }
        });

        return dependencies;
    },
};
