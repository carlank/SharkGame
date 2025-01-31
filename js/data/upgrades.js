// TODO: separate upgrades?
// NAMES, EFFECTS, DESCRIPTIONS, IF THEY EXIST, COSTS, PREREQUISITES
// names will remain constant
// effects vary with what is or isn't in the world
// this is hard
// i cant tell if i'll need to just make separate, independent lists
// i probably will
// but that's for later

// my end conclusion is that I will certainly be putting upgrades into individual lists,
// separated by world type. therefore every world gets its own upgrade progression individually,
// so I can closely monitor and control the progression in every world, have individual and unique
// descriptions and names and effects, and have the progression of each species vary by world.

SharkGame.Upgrades = {
        getUpgradeTable() {
        const worldType = SharkGame.World.worldType;
        if (worldType === "stone") {
            return SharkGame.Upgrades.stoneUpgrades;
        }
        return SharkGame.Upgrades.standardUpgrades;
    },
    
    /* sharks: {
        upgrades: [
            "crystalBite",
            "ancestralRecall"
        ],
        suggests: [
            "sharkmachines"
        ]
    },

    rays: {
        upgrades: ["crystalSpade", "laserRays", "rayBiology"],
    },

    crabs: {
        upgrades: ["crabBiology"],
    },

    lobsters: {
        upgrades: ["clamScooping"],
        implies: ["crustaceans"]
    },

    shrimp: {
        upgrades: ["eusociality", "wormWarriors"],
        implies: ["crustaceans"]
    },

    crustaceans: {
        upgrades: ["crustaceanBiology"],
        suggests: ["crustaceanmachines", "shrimp", "lobsters"],
        category: true
    },

    dolphins: {
        upgrades: [
            "dolphinBiology",
            "delphinePhilosophy",
            "coralHalls"
        ],
        implies: [
            "cetaceans"
        ]
    },
    
    whales: {
        upgrades: [
            "eternalSong"
        ],
        implies: [
            "cetaceans"
        ]
    },
    
    cetaceans: {
        upgrades: [
            "cetaceanAwareness",
            "primordialSong"
        ],
        suggests: [
            "cetaceantechnology",
            "dolphins",
            "whales"
        ],
        category: true
    },
    
    octopuses: {
        upgrades: [
            "octopusMethodology",
            "octalEfficiency",
            "eightfoldOptimisation"
        ],
        suggests: [
            "octopusmachines"
        ]
    },
    
    eels: {
        upgrades: [
            "eelHabitats",
            "creviceCreches",
            "bioelectricity",
            "leviathanHeart"
        ]
    },
    
    chimaera: {
        upgrades: [
            "chimaeraMysticism",
            "abyssalEnigmas"
        ]
    },
    
    sharkmachines: {
        upgrades: [
            "engineering",
            "recyclerDiscovery",
            "iterativeDesign",
            "superprocessing",
            "mechanisedAlchemy"
        ]
    },
    
    octopusmachines: {
        upgrades: [
            "industrialGradeSponge",
            "sprongeBiomimicry"
        ]
    },
    
    crustaceanmachines: {
        upgrades: [
            "coralglassSmelting",
            "coralCircuitry",
            "mobiusShells"
        ]
    },
    
    cetaceanmachines: {
        upgrades: [
            "dolphinTechnology",
            "imperialDesigns"
        ]
    },

    recycler: {
        upgrades: [
            "recyclerDiscovery",
            "superprocessing"
        ]
    }, */

    standardUpgrades: {
        crystalBite: {
            name: "Crystal Bite-Gear",
            desc: "Bite the crystals we have into something to help biting!",
            researchedMessage: "Weird teeth-wear has been developed, and sharks can now catch fish better as a result.",
            effectDesc:
                "Sharks are twice as effective with their new biting gear. Turns out they work better outside the mouth!",
            cost: {
                science: 50,
                fish: 10,
                crystal: 5,
            },
            effect: {
                multiplier: {
                    shark: 2,
                },
            },
        },

        crystalSpade: {
            name: "Crystal Spades",
            desc: "Fashion strange harness-tools for the rays.",
            researchedMessage: "The rays can now bother the sand more effectively, and dig up more sand now!",
            effectDesc: "Rays are twice as effective with their specially adapted digging tools.",
            cost: {
                science: 50,
                sand: 20,
                crystal: 5,
            },
            effect: {
                multiplier: {
                    ray: 2,
                },
            },
        },

        crystalContainer: {
            name: "Crystal Containers",
            desc: "Make weird bottle things from the crystals we have. Maybe useful??",
            researchedMessage:
                "Well, things can go into these containers that aren't water. This makes science easier!",
            effectDesc: "Scientists are twice as effective at making with the science.",
            cost: {
                science: 100,
                crystal: 50,
            },
            effect: {
                multiplier: {
                    scientist: 2,
                },
            },
        },

        statsDiscovery: {
            name: "Storage Caverns",
            desc:
                "It's about time to start moving the stores we have to a better place. We've found one but it needs setting up.",
            researchedMessage:
                "All the goods we've acquired are now being stored and itemised in a mostly flooded cavern system. No more stray currents washing it all away hopefully!",
            effectDesc:
                "By storing things in a centralised location, we now finally have an idea of what we're doing. Sort of.",
            cost: {
                science: 150,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
        },

        underwaterChemistry: {
            name: "Underwater Chemistry",
            desc: "With the weird bottles, we can now put things and other things into them and see what happens.",
            researchedMessage:
                "Well, nothing useful was determined, but if we keep on doing it we make tremendous leaps for science!",
            effectDesc: "Scientists are twice as effective with their new chemical insights.",
            cost: {
                science: 200,
                crystal: 50,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
            effect: {
                multiplier: {
                    scientist: 2,
                },
            },
        },

        seabedGeology: {
            name: "Seabed Geology",
            desc: "Study the bottom of the ocean to determine the rich, deep, juicy secrets it contains.",
            researchedMessage:
                "Not only did we find a whole bunch of weird things, the rays found that there was more sand!",
            effectDesc:
                "Rays are twice as effective with their understanding of the seabed and its varieties of sediment.",
            cost: {
                science: 250,
                sand: 250,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
            effect: {
                multiplier: {
                    ray: 2,
                },
            },
        },

        thermalVents: {
            name: "Thermal Vents",
            desc: "Investigate the boiling vents that just seem to keep on heating things up.",
            researchedMessage: "This is a wondrous, unending source of heat! Something good must come from this.",
            effectDesc: "A power source for future technologies has been discovered.",
            cost: {
                science: 300,
                sand: 500,
            },
            required: {
                upgrades: ["seabedGeology"],
            },
        },

        spongeCollection: {
            name: "Sponge Collection",
            desc:
                "We can see these things littering the reefs and beds, but we don't know how to collect them without breaking them.",
            researchedMessage:
                "Understanding the fragile nature of sponges and their weird porous texture, we can now collect sponges by not biting so hard.",
            effectDesc: "Sponge can be collected in the same way fish can be.",
            cost: {
                science: 400,
            },
            required: {
                upgrades: ["seabedGeology"],
                resources: ["sponge"],
            },
        },

        clamScooping: {
            name: "Clam Scooping",
            desc: "We see these things all over the seabed but we can't tell which are clams and which are rocks.",
            researchedMessage:
                "Patient observation has shown that clams and rocks are in fact different and distinct things. Now we won't be scooping up any more rocks!",
            effectDesc: "Clams can be collected like fish.",
            cost: {
                science: 600,
            },
            required: {
                upgrades: ["seabedGeology"],
                resources: ["clam"],
            },
        },

        pearlConversion: {
            name: "Pearl Conversion",
            desc:
                "There's these things inside the clams that look shiny like crystals. Maybe we can transmute them to crystals?",
            researchedMessage:
                "Well, we can transmute pearls to crystals now, but we need more of the clam. The whole clam. Yes. The entire clam.",
            effectDesc:
                "We can turn clams into crystals using the pearls inside them as a focus. Maybe one day we won't need to use the entire clam.",
            cost: {
                science: 1500,
            },
            required: {
                upgrades: ["clamScooping", "transmutation"],
                resources: ["clam"],
            },
        },

        jellyfishHunting: {
            name: "Jellyfish Hunting",
            desc:
                "Jellyfish are plenty in the farther waters, but our attempts to catch them is met only with pain. We need better tactics.",
            researchedMessage:
                "The trick to catching jellyfish is caution and avoiding the stinging tendrils. They burn. Oh, they burn.",
            effectDesc: "Jellyfish can be caught like fish. Hey, a fish is a fish, right?",
            cost: {
                science: 800,
            },
            required: {
                upgrades: ["seabedGeology"],
                resources: ["jellyfish"],
            },
        },

        laserRays: {
            name: "Laser Rays",
            desc: "Using arcane shark mystery science, capture the heat of the vents for use by rays.",
            researchedMessage: "The rays can now be granted gear that will let them fuse sand into crystal! Future!",
            effectDesc: "Laser rays can now be geared up to burn the very sand to glassy crystal.",
            cost: {
                science: 100,
                sand: 2000,
                crystal: 100,
            },
            required: {
                upgrades: ["thermalVents"],
                resources: ["ray", "sand"],
            },
        },

        automation: {
            name: "Automation",
            desc: "Using sharkonium, we can make things to do things so we don't have to do the things!",
            researchedMessage: "Now we don't have to do all the work, machines can do it for us! Future!!",
            effectDesc: "Machines can be built to supplement population duties. This is efficient.",
            cost: {
                science: 1500,
                sharkonium: 250,
            },
            required: {
                upgrades: ["thermalVents", "transmutation"],
            },
        },

        environmentalism: {
            name: "Environmentalism",
            desc: "So the machines might be destroying the ocean. We need to fix this.",
            researchedMessage:
                "We've determined that the goop produced by our technology can be refined away into nothing but crystal fresh water!",
            effectDesc:
                "Purifiers can be made to combat the harmful effects of the other machines. Anti-machine machines?",
            cost: {
                science: 500,
            },
            required: {
                upgrades: ["automation"],
                resources: ["tar"],
            },
        },

        thermalConditioning: {
            name: "Thermal Conditioning",
            desc: "We're freezing to death! Machines make heat, right? We need to work on this!!",
            researchedMessage: "Breakthrough! Machines can run alarmingly hot if we take out some of the safeguards!",
            effectDesc:
                "Heaters can be made to fight the freezing process. We don't want to become giant novelty ice cubes!",
            cost: {
                science: 500,
            },
            required: {
                upgrades: ["automation"],
                resources: ["ice"],
            },
        },

        engineering: {
            name: "Engineering",
            desc: "The machines sort of suck. Let's make them better by learning how!",
            researchedMessage: "The machines are twice as good now! We've figured out new designs in the process, too!",
            effectDesc: "Machines are twice as effective. Skimmers and auto-transmuters are now possible to create.",
            cost: {
                science: 2500,
                sharkonium: 1750,
            },
            required: {
                upgrades: ["automation"],
            },
            effect: {
                multiplier: {
                    crystalMiner: 2,
                    fishMachine: 2,
                    sandDigger: 2,
                },
            },
        },

        recyclerDiscovery: {
            name: "Recycler",
            desc:
                "Devise a system of pulverising unwanted resources into a component paste, and reusing them as something else.",
            researchedMessage:
                "Well this thing is frankly terrifying. I wouldn't swim anywhere near the input holes if I were you. Maybe it'll help though!",
            effectDesc:
                "Allows recycling of materials by virtue of a horrifying mechanical maw that consumes all that ventures near it. Future?",
            cost: {
                science: 5000,
                sharkonium: 5000,
            },
            required: {
                upgrades: ["engineering"],
            },
        },

        coralCircuitry: {
            name: "Coral Circuitry",
            desc: "We almost know enough to replicate crustacean technology. Just a few core components remain.",
            researchedMessage:
                "We've unlocked the secrets of crustacean machinery. It's more environmentally friendly, but less efficient.",
            effectDesc: "We can copy some of the safe but slow machines used by the lobsters and shrimp.",
            cost: {
                science: 3000,
                coralglass: 3000,
            },
            required: {
                upgrades: ["automation", "coralglassSmelting"],
                resources: ["coral", "sand"],
            },
        },

        sprongeBiomimicry: {
            name: "Spronge Biomimicry",
            desc:
                "The cephalopod school of thought is that a machine that mimics life is a better machine. We don't understand this so well yet.",
            researchedMessage:
                "For machines that mimic life, these things sure put out a lot of pollution. It's sort of alarming. Very alarming, even.",
            effectDesc:
                "We can mimic some of the life-mimicking biotechnology the octopuses use, but it gums up the oceans so quickly. So very dangerous.",
            cost: {
                science: 3000,
                spronge: 3000,
                junk: 1500,
            },
            required: {
                upgrades: ["automation", "industrialGradeSponge"],
                resources: ["sponge", "junk"],
            },
        },

        dolphinTechnology: {
            name: "Dolphin Technology",
            desc: "The warm-blooded squeakers have machinery that might be useful. Let's reverse-engineer it.",
            researchedMessage:
                "The elaborate crystalline structures of dolphin technology are a ruse to mask their limited function. Inside, they're not so different to our machines.",
            effectDesc:
                "We've reverse-engineered some dolphin machinery. We also, regretfully, learned what the designs are called.",
            cost: {
                science: 3000,
                delphinium: 3000,
            },
            required: {
                upgrades: ["automation", "aquamarineFusion"],
                resources: ["coral", "crystal"],
            },
        },

        agriculture: {
            name: "Agriculture",
            desc:
                "The hunter-gatherer lifestyle will only work so well for us. Maybe we should gather these animals in one place and let them grow.",
            researchedMessage:
                "It is so much easier to get things when they're all in one place. It's like the ocean is our grotto now!",
            effectDesc: "Various roles are twice as effective thanks to farming regions for coral and sponge.",
            cost: {
                science: 500,
                sand: 1000,
            },
            required: {
                upgrades: ["seabedGeology"],
            },
            effect: {
                multiplier: {
                    worker: 2,
                    harvester: 2,
                    treasurer: 2,
                    scavenger: 2,
                },
            },
        },

        kelpHorticulture: {
            name: "Kelp Horticulture",
            desc: "Determine what it takes to plant kelp all over the seabed. Maybe this is useful.",
            researchedMessage:
                "Crab-specific gear has been invented to allow for kelp farming! This is possibly useful.",
            effectDesc: "Crabs can become kelp farmers and grow a living carpet across the bottom of the sea.",
            cost: {
                science: 1000,
                sand: 2000,
            },
            required: {
                upgrades: ["agriculture"],
                resources: ["kelp"],
            },
        },

        biology: {
            name: "Biology",
            desc: "What is a shark? What is inside a shark, except for large amounts of fish?",
            researchedMessage:
                "With a new understanding of their own biology, sharks can now specialise in the manufacture of new sharks.",
            effectDesc:
                "Sharks are twice as effective. Did you know shark eggs don't actually form just because a shark wills them to exist?",
            cost: {
                science: 400,
            },
            required: {
                upgrades: ["underwaterChemistry", "agriculture"],
            },
            effect: {
                multiplier: {
                    shark: 2,
                },
            },
        },

        xenobiology: {
            name: "Xenobiology",
            desc: "Determine what is with these weird faceless creatures we keep finding.",
            researchedMessage:
                "Results inconclusive! Further research required. It could be such a benefit for science!",
            effectDesc:
                "Kelp produces sea apples twice as fast. Also, sea apple isn't a fruit. We can also dissect sea apples and jellyfish for science.",
            cost: {
                science: 600,
            },
            required: {
                upgrades: ["agriculture"],
                resources: ["seaApple", "jellyfish", "sponge"],
            },
            effect: {
                multiplier: {
                    kelp: 2,
                },
            },
        },

        rayBiology: {
            name: "Ray Biology",
            desc:
                "Though kindred to the sharks, we know so little about the rays. If only we could fix this. We need to bait a sand trap.",
            researchedMessage:
                "Apparently we could have just asked. We learned how rays make more rays. It's kinda similar to sharks, really, but rays.",
            effectDesc:
                "Rays and laser rays are twice as effective. We may never repair the shark-ray relations to their former state after how awkward this whole affair was.",
            cost: {
                science: 700,
                sand: 600,
            },
            required: {
                upgrades: ["biology", "laserRays"],
                resources: ["ray", "kelp"],
            },
            effect: {
                multiplier: {
                    ray: 2,
                    laser: 2,
                },
            },
        },

        crabBiology: {
            name: "Crab Biology",
            desc:
                "Crabs are a mystery. They keep to themselves and dig up crystals or put down plants. What is even up with that? What ARE crabs??",
            researchedMessage:
                "It turns out crabs are friendly crustaceans that have revealed to the sharks the secrets of crab generation. It involves eggs, or something. Squirmy eggs.",
            effectDesc:
                "Crabs and planter crabs are twice as effective. Crabs are alright but they are also sort of terrifying and weird. Good job they're on our side!",
            cost: {
                science: 500,
                kelp: 100,
            },
            required: {
                upgrades: ["biology", "sunObservation"],
                resources: ["crab"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                    planter: 2,
                },
            },
        },

        crustaceanBiology: {
            name: "Crustacean Biology",
            desc: "These strange creatures related to crabs require further investigation. What is with exoskeletons?",
            researchedMessage: "We've figured out how these shellfish function. There's far too many limbs involved.",
            effectDesc:
                "Shrimp and lobsters are twice as effective. Lobsters can now gather other things or cover themselves in shiny eggs, also called 'berries'. What's a berry?",
            cost: {
                science: 500,
                clam: 100,
            },
            required: {
                upgrades: ["biology"],
                resources: ["shrimp", "lobster"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                    lobster: 2,
                },
            },
        },

        eusociality: {
            name: "Eusociality",
            desc:
                "The shrimp are weirder than we thought. They have some advanced social system beyond our comprehension. What is the deal?",
            researchedMessage:
                "We have learned far more than we needed to about the duties of egg bearing queens in eusocial colonies.",
            effectDesc:
                "Shrimp are twice as effective. Shimp queens and dedicated shrimp workers are available, and we'll never sleep soundly again.",
            cost: {
                science: 1000,
                sponge: 500,
            },
            required: {
                upgrades: ["crustaceanBiology"],
                resources: ["shrimp"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                },
            },
        },

        wormWarriors: {
            name: "Worm Warriors",
            desc:
                "Shrimp sponge hives are under constant threat from outside invaders that aren't us. A collaboration effort might help them out.",
            researchedMessage:
                "Primordial shark techniques of self-defense have lead to the establishment of a new shrimp caste - the worm warrior.",
            effectDesc:
                "Shrimp, shrimp queens and shrimp workers are twice as effective now that they don't need to worry about worms eating them.",
            cost: {
                science: 3000,
                shrimp: 300,
            },
            required: {
                upgrades: ["eusociality"],
                resources: ["shrimp"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                    queen: 2,
                    worker: 2,
                },
            },
        },

        cetaceanAwareness: {
            name: "Cetacean Awareness",
            desc:
                "From a distance, it's harder to tell which of us are really sharks or... those other things. We need to figure this out.",
            researchedMessage:
                "Right, so, dolphins and whales have a horizontal tail and sharks have a vertical tail. Also, they have warm blood and bigger brains. Jerks.",
            effectDesc:
                "Whales and dolphins are twice as effective, now that we can adapt our hunting strategies to their supposed 'strengths'.",
            cost: {
                science: 2000,
                fish: 500,
            },
            required: {
                upgrades: ["biology"],
                resources: ["dolphin", "whale"],
            },
            effect: {
                multiplier: {
                    dolphin: 2,
                    whale: 2,
                },
            },
        },

        dolphinBiology: {
            name: "Dolphin Biology",
            desc: "Do we really have to learn about this? We do? Alright, then.",
            researchedMessage:
                "We managed to offend the dolphins with our questions so much they decided to form their own biological research team.",
            effectDesc:
                "Dolphins are twice as effective but double a small number is still small. Also now they can make more dolphins. <em>Hooray.</em>",
            cost: {
                science: 3000,
                fish: 1000,
            },
            required: {
                upgrades: ["cetaceanAwareness"],
                resources: ["dolphin"],
            },
            effect: {
                multiplier: {
                    dolphin: 2,
                },
            },
        },

        delphinePhilosophy: {
            name: "Delphine Philosophy",
            desc:
                "The whales are known to be natural philosophers. The dolphins, not so much. Nonetheless, we need to appreciate their culture for them to pay attention to us.",
            researchedMessage:
                "Please let's never do this again. They have fifty dozen parables involving bubbles. BUBBLES. NEVER AGAIN.",
            effectDesc:
                "Dolphin biologists are twice as effective now that we don't keep openly mocking them. Also, dolphins are more comfortable in their former roles.",
            cost: {
                science: 5000,
                fish: 1000,
            },
            required: {
                upgrades: ["dolphinBiology"],
                resources: ["dolphin"],
            },
            effect: {
                multiplier: {
                    biologist: 2,
                },
            },
        },

        coralHalls: {
            name: "Coral Halls",
            desc: "The demands don't stop! Now they want living spaces made of coral! Is this really necessary?",
            researchedMessage:
                "We begrudingly helped them establish new living spaces a little distant from the rest of our frenzy.",
            effectDesc:
                "Dolphins are happier and twice as effective. Philosophers and treasurers are also twice as effective. Everyone wins, and all it cost us was our dignity and resolve. Sigh.",
            cost: {
                science: 10000,
                coral: 2000,
            },
            required: {
                upgrades: ["delphinePhilosophy"],
                resources: ["dolphin"],
            },
            effect: {
                multiplier: {
                    dolphin: 2,
                    philosopher: 2,
                    treasurer: 2,
                },
            },
        },

        eternalSong: {
            name: "Eternal Song",
            desc:
                "The whales claim to know segments of some form of ancient ethereal music that connects worlds. We can collect what they know to piece it together ourselves.",
            researchedMessage: "We have determined the eternal song of the gates. We don't know what it does yet.",
            effectDesc:
                "A chorus of whales can be assembled to sing the eternal song, but we have no clue what it will do.",
            cost: {
                science: 1e9,
            },
            required: {
                upgrades: ["cetaceanAwareness"],
                resources: ["whale"],
            },
        },

        eelHabitats: {
            name: "Eel Habitats",
            desc:
                "So we keep seeing these things we thought were kelp on the seabed, but it turns out they're not kelp. What are they?",
            researchedMessage:
                "After some discussion with the eels on the nature of eel pits and safety and security in the form of seabed holes, we understand, maybe.",
            effectDesc:
                "Eels are twice as effective now we know how they prefer to live. Eels are also able to specialise in a variety of different ways with a place to store their things.",
            cost: {
                science: 800,
                clam: 200,
            },
            required: {
                upgrades: ["biology"],
                resources: ["eel"],
            },
            effect: {
                multiplier: {
                    eel: 2,
                },
            },
        },

        creviceCreches: {
            name: "Crevice Creches",
            desc: "We can probably figure out a way to make eel pits cosier for their inhabitants.",
            researchedMessage:
                "We've developed a design to improve the quality of eel pits involving a complicated system of chambers and subterranean warrens. Look, it... let's not worry about the specifics this time, okay?",
            effectDesc: "Eels are twice as effective, and so are eel pits. Expect many baby eels in the future.",
            cost: {
                science: 800,
                clam: 200,
            },
            required: {
                upgrades: ["eelHabitats"],
                resources: ["eel"],
            },
            effect: {
                multiplier: {
                    eel: 2,
                    pit: 2,
                },
            },
        },

        bioelectricity: {
            name: "Bioelectricity",
            desc:
                "There has to be a way to harness the powers of some of the eels. We all know they have powers. Painful ones.",
            researchedMessage:
                "The technically inclined electric eels practically jumped out of the water at the chance to work with the machines. Should we be concerned?",
            effectDesc: "Eel technicians are twice as effective. So are our machines. Convenient!",
            cost: {
                science: 3200,
                clam: 800,
            },
            required: {
                upgrades: ["eelHabitats", "engineering"],
                resources: ["eel"],
            },
            effect: {
                multiplier: {
                    technician: 2,
                    fishMachine: 2,
                    sandDigger: 2,
                    autoTransmuter: 2,
                    skimmer: 2,
                    purifier: 2,
                    heater: 2,
                },
            },
        },

        octopusMethodology: {
            name: "Octopus Methodology",
            desc: "The octopuses claim they know ways to improve their routines and machines.",
            researchedMessage:
                "We have no idea what thought processes guide these cephalopod allies of ours, but they know how to get results.",
            effectDesc:
                "Octopuses can specialise in different tasks, and their machines are constructed to be twice as efficient.",
            cost: {
                science: 8888,
                clam: 88,
            },
            required: {
                upgrades: ["exploration"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    clamCollector: 2,
                    eggBrooder: 2,
                    sprongeSmelter: 2,
                    seaScourer: 2,
                    prostheticPolyp: 2,
                },
            },
        },

        octalEfficiency: {
            name: "Octal Efficiency",
            desc: "The octopuses wish to further enhance their productivity for collective gain.",
            researchedMessage:
                "The instructions constructed and disseminated by the octopuses are complex and only understood to other octopuses. Head hurts. Something about the number eight.",
            effectDesc:
                "Octopuses and their specialists are twice as effective, as are their machines. Find unity in efficiency.",
            cost: {
                science: 88888,
                clam: 888,
            },
            required: {
                upgrades: ["octopusMethodology"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    clamCollector: 2,
                    eggBrooder: 2,
                    sprongeSmelter: 2,
                    seaScourer: 2,
                    prostheticPolyp: 2,
                    octopus: 2,
                    collector: 2,
                    scavenger: 2,
                },
            },
        },

        chimaeraMysticism: {
            name: "Chimaera Mysticism",
            desc:
                "We know the chimaeras, but we don't them very well. We need to adjust our thinking to understand their riddles.",
            researchedMessage:
                "After much thoughtful contemplation, the chimaeras have despaired at our inability to understand and shared their knowledge with us.",
            effectDesc:
                "Chimaeras can now become dedicated transmuters or explorers, using our knowledge to assist our industry or sharing their knowledge as they journey through the deeper seas.",
            cost: {
                science: 12000,
                jellyfish: 700,
            },
            required: {
                upgrades: ["farExploration"],
                resources: ["chimaera"],
            },
        },

        abyssalEnigmas: {
            name: "Abyssal Enigmas",
            desc:
                "The chimaeras have returned from the deeper oceans with artifacts they can't explain. We need to work together to understand them.",
            researchedMessage:
                "Well, we still have no idea what these things are, but we've formed a stronger bond with our estranged kin.",
            effectDesc:
                "Chimaeras and their specialists are twice as effective thanks to stronger trust and friendship. Also we still don't know what these things they found do.",
            cost: {
                science: 40000,
                jellyfish: 2000,
            },
            required: {
                upgrades: ["chimaeraMysticism"],
                resources: ["chimaera"],
            },
            effect: {
                multiplier: {
                    chimaera: 2,
                    transmuter: 2,
                    explorer: 2,
                },
            },
        },

        sunObservation: {
            name: "Sun Observation",
            desc: "We must determine what is with the weird glare on the surface of the water.",
            researchedMessage:
                "Shark science has discovered the sun! It has also discovered that looking directly into the sun hurts.",
            effectDesc:
                "Planter crabs are twice as effective, and shrimp are four times as effective. Is a suns worth many fish? We can see a sun, but where is it really? And by what is it made of?",
            cost: {
                science: 5000,
            },
            required: {
                upgrades: ["agriculture"],
            },
            effect: {
                multiplier: {
                    planter: 2,
                    shrimp: 4,
                },
            },
        },

        transmutation: {
            name: "Transmutation",
            desc: "By heating things up and doing science things to them, maybe new things can be made!",
            researchedMessage:
                "A new form of material has been discovered! It has been named after its discoverer, Dr. Sharkonium.",
            effectDesc:
                "Enables transmutation of some random junk we have lying around into sharkonium, material of the future.",
            cost: {
                science: 1000,
                crystal: 2000,
                sand: 4000,
            },
            required: {
                upgrades: ["thermalVents", "underwaterChemistry"],
            },
        },

        coralglassSmelting: {
            name: "Coralglass Smelting",
            desc:
                "Careful observation of crustacean smelting processes will let us copy their method for coralglass creation.",
            researchedMessage:
                "Our allies among the shelled creatures have revealed to us the secrets of underwater glassmaking! It's, uh, complicated.",
            effectDesc: "Enables smelting of coralglass, a vital component in crustacean technology.",
            cost: {
                science: 1000,
                coral: 3000,
                sand: 3000,
            },
            required: {
                upgrades: ["thermalVents", "crustaceanBiology"],
                resources: ["coral", "sand"],
            },
        },

        industrialGradeSponge: {
            name: "Industrial-Grade Sponge",
            desc:
                "Our octopus contacts inform us that sponge is highly useful with a little augmentation. Let's figure this out.",
            researchedMessage:
                "By infusing sponge with processed matter, we have devised spronge, a versatile super-material that kind of freaks us out!",
            effectDesc:
                "Enables creation of spronge, the backbone... uh... the core material in cephalopod technology.",
            cost: {
                science: 1000,
                sponge: 2000,
                junk: 4000,
            },
            required: {
                upgrades: ["recyclerDiscovery", "octopusMethodology"],
                resources: ["sponge", "junk"],
            },
        },

        aquamarineFusion: {
            name: "Aquamarine Fusion",
            desc:
                "Those uppity dolphins think they're the only ones who can make their special delphinium. We'll show them.",
            researchedMessage:
                "In a weird corrupted version of our own transmutation, we've figured out how to make delphinium and now we feel gross.",
            effectDesc:
                "Enables transmutation of a different bunch of junk into delphinium, a substance inherently inferior to sharkonium.",
            cost: {
                science: 1000,
                coral: 4000,
                crystal: 4000,
            },
            required: {
                upgrades: ["transmutation", "cetaceanAwareness"],
                resources: ["coral", "crystal"],
            },
        },

        iterativeDesign: {
            name: "Iterative Design",
            desc:
                "The machines are useful, but they could be better. Maybe it's time we started over?",
            researchedMessage:
                "A couple hundred new and hours of scrutinization later, we've managed to surpass the limits of our old designs! As it turns out, science is about learning from our mistakes, or so the scientists tell me.",
            effectDesc: "All shark machines run twice as fast. Finally!",
            cost: {
                science: 15000,
                sharkonium: 17500,
            },
            required: {
                upgrades: ["engineering"],
            },
            effect: {
                multiplier: {
                    crystalMiner: 2,
                    fishMachine: 2,
                    sandDigger: 2,
                    autoTransmuter: 2,
                    skimmer: 2,
                    heater: 2,
                    purifier: 2,
                },
            },
        },

        superprocessing: {
            name: "Superprocessing",
            desc: "The recycler wasn't really meant for 1 million fish at once. Seeing as that transaction is now fairly common, we should probably do something about it.",
            researchedMessage:
                "Eureka! If we make the big things bigger, and the grinders grindier, we can process way more material at once!",
            effectDesc:
                "The recycler's efficiency only starts dropping at 1 million material inserted at once, instead of 100 thousand. The base efficiency is now 100%.",
            cost: {
                science: 1e6,
                sharkonium: 1e6,
                junk: 1e6,
            },
            required: {
                upgrades: ["iterativeDesign", "recyclerDiscovery"],
            },
        },

        exploration: {
            name: "Exploration",
            desc: "Swim beyond the home seas to see what can be found!",
            researchedMessage:
                "Found lots of schools of fish! So many different schools! And such untapped sand reserves!",
            effectDesc: "Sharks and rays are twice as effective. Did you know oceans are big? Fascinating!",
            cost: {
                science: 5000,
                fish: 5000,
            },
            required: {
                upgrades: ["sunObservation"],
            },
            effect: {
                multiplier: {
                    shark: 2,
                    ray: 2,
                },
            },
        },

        farExploration: {
            name: "Far Explorations",
            desc: "Explore the vast reaches beyond the home ocean.",
            researchedMessage: "Crystal-rich deposits were found, as well as strange, deep chasms.",
            effectDesc:
                "Crabs are four times as effective. Did you know oceans are actually even bigger than big? Remarkable!",
            cost: {
                science: 8000,
                fish: 15000,
            },
            required: {
                upgrades: ["exploration"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                },
            },
        },

        gateDiscovery: {
            name: "Chasm Exploration",
            desc: "A campaign of risky, foolhardy expeditions to the deeps, to find whatever can be found.",
            researchedMessage:
                "A strange structure was found from clues within the chasms. The cost was great, but the discovery is greater!",
            effectDesc: "Something ancient lurked in the depths.",
            cost: {
                science: 1e6,
                shark: 1000,
                fish: 50000,
            },
            required: {
                upgrades: ["farExploration"],
            },
        },

        /* knowledgeCoalescers: {
            name: "Knowledge Coalescers",
            desc:
                "The dolphins say they have a design to accrue knowledge directly from the ocean. Maybe we should hear them out.",
            researchedMessage:
                "With enough staring, we managed to decipher the cryptic and unhelpful instructions they gave us. Turns out, it's not a machine...it's more like an altar.",
            effectDesc: "Knowledge coalescers are now available. Education has never been easier!",
            cost: {
                science: 1e8,
                knowledge: 5,
            },
            required: {
                upgrades: ["gateDiscovery", "dolphinTechnology"],
                worlds: ["ethereal"],
            },
        }, */

        // SUPERSCIENCE

        ancestralRecall: {
            name: "Ancestral Recall",
            desc:
                "The sharks and rays know we share some features among ourselves. Using the vague glimpses of dreams, let's piece together the puzzle.",
            researchedMessage:
                "Our giant ancestors and the creatures of a long distant past have inspired us to become even greater!",
            effectDesc:
                "Sharks, rays and chimaeras, and their roles, are all four times as effective. We have had a glorious past. Now, on to a glorious future.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery"],
                resources: ["shark", "ray", "chimaera"],
            },
            effect: {
                multiplier: {
                    shark: 4,
                    diver: 4,
                    science: 4,
                    nurse: 4,
                    ray: 4,
                    maker: 4,
                    laser: 4,
                    chimaera: 4,
                    transmuter: 4,
                    explorer: 4,
                },
            },
        },

        utilityCarapace: {
            name: "Utility Carapace",
            desc: "The exoskeleton is good enough, but with some adjustments, perhaps coralglass can improve it.",
            researchedMessage:
                "Coralglass carapace augmentation is a go! The crustaceans now carry their protection and their tools everywhere they go.",
            effectDesc:
                "Crabs, shrimp and lobsters, and their roles, are all four times as effective. A shell protects, and a shell interfaces.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "coralglassSmelting"],
                resources: ["crab", "shrimp", "lobster"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                    brood: 4,
                    planter: 4,
                    shrimp: 4,
                    worker: 4,
                    queen: 4,
                    lobster: 4,
                    berrier: 4,
                    harvester: 4,
                },
            },
        },

        primordialSong: {
            name: "Primordial Song",
            desc:
                "Even the dolphins can remember an ancient song. The whales know more, but it stirs within both of them.",
            researchedMessage:
                "The dolphins were shaken and moved by their collective realisation of something greater than them. They've been quieter since. The whales seemed indifferent.",
            effectDesc:
                "Dolphins and whales, and their roles, are all four times as effective. The song of the ocean is older than life itself.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "cetaceanAwareness"],
                resources: ["dolphin", "whale"],
            },
            effect: {
                multiplier: {
                    dolphin: 4,
                    biologist: 4,
                    treasurer: 4,
                    philosopher: 4,
                    whale: 4,
                },
            },
        },

        leviathanHeart: {
            name: "Leviathan Heart",
            desc: "The eels are meek and unassuming, but deep within them lies a greater potential. Let's unleash it.",
            researchedMessage:
                "We have found the connection between the eels we know and the ancient giant serpents we knew only in legend. This has inspired every eel we know to do greater things.",
            effectDesc:
                "Eels and their roles are all four times as effective. The power of determination can overcome many odds.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "bioelectricity"],
                resources: ["eel"],
            },
            effect: {
                multiplier: {
                    eel: 4,
                    pit: 4,
                    sifter: 4,
                    technician: 4,
                },
            },
        },

        eightfoldOptimisation: {
            name: "Eightfold Optimisation",
            desc: "Enhance productivity. Optimise. Improve. Improve.",
            researchedMessage: "Peak productivity attained. Maintain course. Maintain efficiency.",
            effectDesc:
                "Octopuses and their roles, as well as their machines, are all four times as effective. Optimised.",
            cost: {
                science: 8e10,
            },
            required: {
                upgrades: ["gateDiscovery", "octalEfficiency"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    octopus: 4,
                    collector: 4,
                    scavenger: 4,
                    clamCollector: 4,
                    eggBrooder: 4,
                    sprongeSmelter: 4,
                    seaScourer: 4,
                    prostheticPolyp: 4,
                },
            },
        },

        mechanisedAlchemy: {
            name: "Mechanised Alchemy",
            desc: "Better engineering and transmutation processes lead to a refinement of our machines.",
            researchedMessage: "We are blurring the line between science and magic more than ever before!",
            effectDesc:
                "Shark machines are all four times as effective. We work better with the machines, not against them.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "iterativeDesign"],
                resources: ["sharkonium"],
            },
            effect: {
                multiplier: {
                    fishMachine: 4,
                    crystalMiner: 4,
                    sandDigger: 4,
                    autoTransmuter: 4,
                    skimmer: 4,
                    purifier: 4,
                    heater: 4,
                },
            },
        },

        mobiusShells: {
            name: "Mobius Shells",
            desc: "The intricate glasswork of crustacean technology can be made even finer for maximised performance.",
            researchedMessage:
                "So beautiful. So impossible, but yet so effective. Is it impossible? What are we looking at here?",
            effectDesc:
                "Crustacean machines are all four times as effective. Their glass shells defy all reason and geometry.",
            cost: {
                science: 1e9,
            },
            required: {
                upgrades: ["gateDiscovery", "coralCircuitry"],
                resources: ["coralglass"],
            },
            effect: {
                multiplier: {
                    spongeFarmer: 4,
                    berrySprayer: 4,
                    glassMaker: 4,
                },
            },
        },

        imperialDesigns: {
            name: "Imperial Designs",
            desc:
                "Some of the dolphins remember and have copies of plans for their machines from wherever they used to call home.",
            researchedMessage:
                "These designs will never work. Look, let's show them-- oh. Oh, apparently they do. Huh.",
            effectDesc:
                "Cetacean machines are all four times as effective. We begrudingly admit their quality is not entirely terrible.",
            cost: {
                science: 1e9,
            },
            required: {
                upgrades: ["gateDiscovery", "dolphinTechnology"],
                resources: ["delphinium"],
            },
            effect: {
                multiplier: {
                    tirelessCrafter: 4,
                    silentArchivist: 4,
                },
            },
        },
    },

    stoneUpgrades: {
        crystalBite: {
            name: "Crystal Bite-Gear",
            desc: "Bite the crystals we have into something to help biting!",
            researchedMessage: "Weird teeth-wear has been developed, and sharks can now catch fish better as a result.",
            effectDesc:
                "Sharks are twice as effective with their new biting gear. Turns out they work better outside the mouth!",
            cost: {
                science: 50,
                fish: 10,
                crystal: 5,
            },
            effect: {
                multiplier: {
                    shark: 2,
                },
            },
        },

        crystalScoop: {
            name: "Crystal Scoopers",
            desc: "Gathering crystals is hard. Maybe science can make it easier??",
            researchedMessage: "We have developed weird little trowels for the crabs. Progress?",
            effectDesc: "Crabs are twice as effective at gathering crystals.",
            cost: {
                science: 75,
                crystal: 10,
            },
            effect: {
                multiplier: {
                    crab: 2,
                },
            },
        },

        crystalContainer: {
            name: "Crystal Containers",
            desc: "Make weird bottle things from the crystals we have. Maybe useful??",
            researchedMessage:
                "Well, things can go into these containers that aren't water. This makes science easier!",
            effectDesc: "Scientists are twice as effective at making with the science.",
            cost: {
                science: 100,
                crystal: 50,
            },
            effect: {
                multiplier: {
                    scientist: 2,
                },
            },
        },

        statsDiscovery: {
            name: "Storage Caverns",
            desc:
                "It's about time to start moving the stores we have to a better place. We've found one but it needs setting up.",
            researchedMessage:
                "All the goods we've acquired are now being stored and itemised in a mostly flooded cavern system. No more stray currents washing it all away hopefully!",
            effectDesc:
                "By storing things in a centralised location, we now finally have an idea of what we're doing. Sort of.",
            cost: {
                science: 150,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
        },

        underwaterChemistry: {
            name: "Underwater Chemistry",
            desc: "With the weird bottles, we can now put things and other things into them and see what happens.",
            researchedMessage:
                "Well, nothing useful was determined, but if we keep on doing it we make tremendous leaps for science!",
            effectDesc: "Scientists are twice as effective with their new chemical insights.",
            cost: {
                science: 200,
                crystal: 50,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
            effect: {
                multiplier: {
                    scientist: 2,
                },
            },
        },

        seabedGeology: {
            name: "Seafloor Geology",
            desc: "Study the bottom of the ocean to determine the rich, deep, juicy secrets it contains.",
            researchedMessage:
                "The rays found that there was a bunch of rocky sediment on the seafloor. This requires further study!",
            effectDesc:
                "Rays find twice as many fish by understanding their hiding spots. Also, gravel has been discovered. This is...useful??",
            cost: {
                science: 250,
            },
            required: {
                upgrades: ["crystalContainer"],
            },
            effect: {
                multiplier: {
                    ray: 2,
                },
            },
        },

        thermalVents: {
            name: "Thermal Vents",
            desc: "Investigate the boiling vents that just seem to keep on heating things up.",
            researchedMessage: "This is a wondrous, unending source of heat! Something good must come from this.",
            effectDesc: "A power source for future technologies has been discovered.",
            cost: {
                science: 350,
                gravel: 300,
            },
            required: {
                upgrades: ["seabedGeology"],
            },
        },

        crystalShovel: {
            name: "Crystal Shovels",
            desc: "Perhaps this gravel stuff has a use. Let's see if collecting it does any good.",
            researchedMessage: "Operation shovel-it-up has been a complete success! The rays are ecstatic.",
            effectDesc: "Rays can now specialise in shovelling gravel.",
            cost: {
                science: 450,
                crystal: 100,
            },
            required: {
                upgrades: ["seabedGeology", "crystalScoop"],
            },
        },

        spongeCollection: {
            name: "Sponge Collection",
            desc:
                "We can see these things littering the rocks and boulders, but we don't know how to collect them without breaking them.",
            researchedMessage:
                "Understanding the fragile nature of sponges and their weird porous texture, we can now collect sponges by not biting so hard.",
            effectDesc: "Sponge can be collected manually, 2 at a time.",
            cost: {
                science: 250,
            },
            required: {
                upgrades: ["seabedGeology"],
            },
        },

        clamScooping: {
            name: "Clam Scooping",
            desc: "We see these things all over the seabed but we can't tell which are clams and which are rocks.",
            researchedMessage:
                "Patient observation has shown that clams and rocks are in fact different and distinct things. Now we won't be scooping up any more rocks (at least, not on accident)!",
            effectDesc: "Clams can be collected like fish.",
            cost: {
                science: 750,
            },
            required: {
                upgrades: ["seabedGeology"],
                resources: ["clam"],
            },
        },

        pearlConversion: {
            name: "Pearl Conversion",
            desc:
                "There's these things inside the clams that look shiny like crystals. Maybe we can transmute them to crystals?",
            researchedMessage:
                "Well, we can transmute pearls to crystals now, but we need more of the clam. The whole clam. Yes. The entire clam.",
            effectDesc:
                "We can turn clams into crystals using the pearls inside them as a focus. Maybe one day we won't need to use the entire clam.",
            cost: {
                science: 1500,
            },
            required: {
                upgrades: ["clamScooping", "transmutation"],
                resources: ["clam"],
            },
        },

        jellyfishHunting: {
            name: "Jellyfish Hunting",
            desc:
                "Jellyfish are plenty in the farther waters, but our attempts to catch them is met only with pain. We need better tactics.",
            researchedMessage:
                "The trick to catching jellyfish is caution and avoiding the stinging tendrils. They burn. Oh, they burn.",
            effectDesc: "Jellyfish can be caught like fish. Hey, a fish is a fish, right?",
            cost: {
                science: 800,
            },
            required: {
                upgrades: ["seabedGeology"],
                resources: ["jellyfish"],
            },
        },

        prospectorSharks: {
            name: "Prospector Sharks",
            desc: "The caves of the grotto have lots of crystals, but they're all stuck to the walls!",
            researchedMessage:
                "The heat from thermal vents lets us sharpen existing crystals enough to break new ones off the walls!",
            effectDesc: "Sharks can now leave fish duty for the mines in search of better socioeconomic opportunities.",
            cost: {
                science: 950,
                gravel: 500,
                sand: 150,
                crystal: 275,
            },
            required: {
                upgrades: ["statsDiscovery", "thermalVents", "agriculture"],
                resources: ["shark", "gravel"],
            },
        },

        automation: {
            name: "Automation",
            desc: "Using sharkonium, we can make things to do things so we don't have to do the things!",
            researchedMessage: "Now we don't have to do all the work, machines can do it for us! Future!!",
            effectDesc: "Machines can be built to supplement population duties. This is efficient.",
            cost: {
                science: 2500,
                sharkonium: 250,
            },
            required: {
                upgrades: ["thermalVents", "transmutation"],
            },
        },

        engineering: {
            name: "Engineering",
            desc: "The machines sort of suck. Let's make them better by learning how!",
            researchedMessage: "The machines are twice as good now! We've figured out new designs in the process, too!",
            effectDesc: "Machines are twice as effective. Skimmers and auto-transmuters are now possible to create.",
            cost: {
                science: 2500,
                sharkonium: 1750,
            },
            required: {
                upgrades: ["automation"],
            },
            effect: {
                multiplier: {
                    crystalMiner: 2,
                    fishMachine: 2,
                    crusher: 2,
                    pulverizer: 2,
                },
            },
        },

        gravelPulverizing: {
            name: "Gravel Pulverizing",
            desc: "Sure, crabs can break down gravel into sand, but it's really slow.",
            researchedMessage:
                "A tight set of tumblers destroys anything inserted into its gaping maw. It's a wonder of science! And extremely lethal! Heed the caution signs!",
            effectDesc: "Pulverizers efficiently turn gravel into sand.",
            cost: {
                science: 7500,
                sharkonium: 250,
                gravel: 2500,
            },
            required: {
                upgrades: ["automation", "prospectorSharks"],
            },
        },

        rockProcessing: {
            name: "Rock Processing",
            desc:
                "Despite all of our advancements, we still can't seem to break stone quickly! Maybe a machine can help?",
            researchedMessage: "We've invented an incredibly dangerous machine which tumbles stones into gravel!",
            effectDesc: "Crushers can now be built, efficiently converting stone directly into gravel.",
            cost: {
                science: 7500,
                sharkonium: 500,
                stone: 2500,
            },
            required: {
                upgrades: ["automation", "prospectorSharks"],
            },
        },

        recyclerDiscovery: {
            name: "Recycler",
            desc:
                "Devise a system of pulverising unwanted resources into a component paste, and reusing them as something else.",
            researchedMessage:
                "Well this thing is frankly terrifying. I wouldn't swim anywhere near the input holes if I were you. Maybe it'll help though!",
            effectDesc:
                "Allows recycling of materials by virtue of a horrifying mechanical maw that consumes all that ventures near it. Future?",
            cost: {
                science: 20000,
                sharkonium: 25000,
            },
            required: {
                upgrades: ["iterativeDesign"],
            },
        },

        sprongeBiomimicry: {
            name: "Spronge Biomimicry",
            desc:
                "The cephalopod school of thought is that a machine that mimics life is a better machine. We don't understand this so well yet.",
            researchedMessage:
                "For machines that mimic life, these things sure put out a lot of pollution. It's sort of alarming. Very alarming, even.",
            effectDesc:
                "We can mimic some of the life-mimicking biotechnology the octopuses use, but it gums up the oceans so quickly. So very dangerous.",
            cost: {
                science: 3000,
                spronge: 3000,
                junk: 1500,
            },
            required: {
                upgrades: ["automation", "industrialGradeSponge"],
                resources: ["sponge", "junk"],
            },
        },

        agriculture: {
            name: "Agriculture",
            desc:
                "The hunter-gatherer lifestyle will only work so well for us. Maybe we should gather these animals in one place and let them grow.",
            researchedMessage:
                "It is so much easier to get things when they're all in one place. It's like the ocean is our grotto now!",
            effectDesc: "Various roles are twice as effective thanks to farming regions for various types of sponges.",
            cost: {
                science: 1000,
                sand: 50,
            },
            required: {
                upgrades: ["seabedGeology", "gravelMilling"],
            },
            effect: {
                multiplier: {
                    worker: 2,
                    harvester: 2,
                    treasurer: 2,
                    scavenger: 2,
                },
            },
        },

        biology: {
            name: "Biology",
            desc: "What is a shark? What is inside a shark, except for large amounts of fish?",
            researchedMessage:
                "With a new understanding of their own biology, sharks can now specialise in the manufacture of new sharks.",
            effectDesc:
                "Sharks are twice as effective. Did you know shark eggs don't actually form just because a shark wills them to exist?",
            cost: {
                science: 400,
            },
            required: {
                upgrades: ["underwaterChemistry", "agriculture"],
            },
            effect: {
                multiplier: {
                    shark: 2,
                },
            },
        },

        rayBiology: {
            name: "Ray Biology",
            desc:
                "Though kindred to the sharks, we know so little about the rays. If only we could fix this. We need to bait a sand trap.",
            researchedMessage:
                "Apparently we could have just asked. We learned how rays make more rays. It's kinda similar to sharks, really, but rays.",
            effectDesc:
                "Rays and shoveler rays are twice as effective. We may never repair the shark-ray relations to their former state after how awkward this whole affair was.",
            cost: {
                science: 700,
                gravel: 250,
            },
            required: {
                upgrades: ["biology", "crystalShovel"],
                resources: ["ray"],
            },
            effect: {
                multiplier: {
                    ray: 2,
                    shoveler: 2,
                },
            },
        },

        gravelMilling: {
            name: "Gravel Milling",
            desc:
                "We've hit a dead end, but the crabs just had an idea. Maybe with all this gravel we've been collecting, we could find a way to make sand?",
            researchedMessage:
                "As it turns out, we were totally onto something. Specialized equipment lets crabs grind up gravel into sand!",
            effectDesc: "Crabs can specialize in the reduction of gravel into sand.",
            cost: {
                science: 750,
                gravel: 550,
                crystal: 200,
            },
            required: {
                upgrades: ["thermalVents", "crystalShovel"],
                resources: ["crab", "gravel"],
            },
        },

        crabBiology: {
            name: "Crab Biology",
            desc:
                "Crabs are a mystery. They keep to themselves and dig up crystals or break down pebbles. What is even up with that? What ARE crabs??",
            researchedMessage:
                "It turns out crabs are friendly crustaceans that have revealed to the sharks the secrets of crab generation. It involves eggs, or something. Squirmy eggs.",
            effectDesc:
                "Crabs and miller crabs are twice as effective. Crabs are alright but they are also sort of terrifying and weird. Good job they're on our side!",
            cost: {
                science: 500,
                fish: 450,
            },
            required: {
                upgrades: ["biology", "sunObservation", "gravelMilling"],
                resources: ["crab"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                    miller: 2,
                },
            },
        },

        crustaceanBiology: {
            name: "Crustacean Biology",
            desc: "These strange creatures related to crabs require further investigation. What is with exoskeletons?",
            researchedMessage: "We've figured out how these shellfish function. There's far too many limbs involved.",
            effectDesc:
                "Shrimp and lobsters are twice as effective. Lobsters can now gather other things or cover themselves in shiny eggs, also called 'berries'. What's a berry?",
            cost: {
                science: 500,
                clam: 100,
            },
            required: {
                upgrades: ["biology"],
                resources: ["shrimp", "lobster"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                    lobster: 2,
                },
            },
        },

        rockBreaking: {
            name: "Rock Lobsters",
            desc: "Look at all this stone! It's too big for the crabs to break down! Useless!!",
            researchedMessage:
                "Okay, so given some specialized training, it's not too big for lobsters to break. Noted.",
            effectDesc: "Lobsters can be trained in the art of breaking stones, which makes gravel.",
            cost: {
                science: 1750,
                stone: 250,
                clam: 1500,
            },
            required: {
                upgrades: ["crustaceanBiology", "prospectorSharks"],
            },
        },

        eusociality: {
            name: "Eusociality",
            desc:
                "The shrimp are weirder than we thought. They have some advanced social system beyond our comprehension. What is the deal?",
            researchedMessage:
                "We have learned far more than we needed to about the duties of egg bearing queens in eusocial colonies.",
            effectDesc:
                "Shrimp are twice as effective. Shimp queens and dedicated shrimp workers are available, and we'll never sleep soundly again.",
            cost: {
                science: 1000,
                sponge: 500,
            },
            required: {
                upgrades: ["crustaceanBiology"],
                resources: ["shrimp"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                },
            },
        },

        wormWarriors: {
            name: "Worm Warriors",
            desc:
                "Shrimp sponge hives are under constant threat from outside invaders that aren't us. A collaboration effort might help them out.",
            researchedMessage:
                "Primordial shark techniques of self-defense have lead to the establishment of a new shrimp caste - the worm warrior.",
            effectDesc:
                "Shrimp, shrimp queens and shrimp workers are twice as effective now that they don't need to worry about worms eating them.",
            cost: {
                science: 3000,
                shrimp: 300,
            },
            required: {
                upgrades: ["eusociality"],
                resources: ["shrimp"],
            },
            effect: {
                multiplier: {
                    shrimp: 2,
                    queen: 2,
                    worker: 2,
                },
            },
        },

        octopusMethodology: {
            name: "Octopus Methodology",
            desc: "The octopuses claim they know ways to improve their routines and machines.",
            researchedMessage:
                "We have no idea what thought processes guide these cephalopod allies of ours, but they know how to get results.",
            effectDesc:
                "Octopuses can specialise in different tasks, and their machines are constructed to be twice as efficient.",
            cost: {
                science: 8888,
                clam: 88,
            },
            required: {
                upgrades: ["exploration"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    clamCollector: 2,
                    eggBrooder: 2,
                    sprongeSmelter: 2,
                    seaScourer: 2,
                    prostheticPolyp: 2,
                },
            },
        },

        octalEfficiency: {
            name: "Octal Efficiency",
            desc: "The octopuses wish to further enhance their productivity for collective gain.",
            researchedMessage:
                "The instructions constructed and disseminated by the octopuses are complex and only understood to other octopuses. Head hurts. Something about the number eight.",
            effectDesc:
                "Octopuses and their specialists are twice as effective, as our their machines. Find unity in efficiency.",
            cost: {
                science: 88888,
                clam: 888,
            },
            required: {
                upgrades: ["octopusMethodology"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    clamCollector: 2,
                    eggBrooder: 2,
                    sprongeSmelter: 2,
                    seaScourer: 2,
                    prostheticPolyp: 2,
                    octopus: 2,
                    collector: 2,
                    scavenger: 2,
                },
            },
        },

        sunObservation: {
            name: "Sun Observation",
            desc: "We must determine what is with the weird glare on the surface of the water.",
            researchedMessage:
                "Shark science has discovered the sun! It has also discovered that looking directly into the sun hurts.",
            effectDesc:
                "Planter crabs are twice as effective, and shrimp are four times as effective. Is a suns worth many fish? We can see a sun, but where is it really? And by what is it made of?",
            cost: {
                science: 5000,
            },
            required: {
                upgrades: ["agriculture"],
            },
            effect: {
                multiplier: {
                    shrimp: 4,
                },
            },
        },

        transmutation: {
            name: "Transmutation",
            desc: "By heating things up and doing science things to them, maybe new things can be made!",
            researchedMessage:
                "A new form of material has been discovered! It has been named after its discoverer, Dr. Sharkonium.",
            effectDesc:
                "Enables transmutation of some random junk we have lying around into sharkonium, material of the future.",
            cost: {
                science: 2000,
                crystal: 1500,
                sand: 1000,
            },
            required: {
                upgrades: ["thermalVents", "underwaterChemistry", "gravelMilling"],
            },
        },

        industrialGradeSponge: {
            name: "Industrial-Grade Sponge",
            desc:
                "Our octopus contacts inform us that sponge is highly useful with a little augmentation. Let's figure this out.",
            researchedMessage:
                "By infusing sponge with processed matter, we have devised spronge, a versatile super-material that kind of freaks us out!",
            effectDesc:
                "Enables creation of spronge, the backbone... uh... the core material in cephalopod technology.",
            cost: {
                science: 1000,
                sponge: 2000,
                junk: 4000,
            },
            required: {
                upgrades: ["thermalVents", "octopusMethodology", "recyclerDiscovery"],
                resources: ["sponge", "junk"],
            },
        },

        sharkoniumMillingGear: {
            name: "Sharkonium Milling Gear",
            desc: "Sand grinding is really hard! The pulverizers have taught us that sharkonium makes it easier.",
            researchedMessage:
                "Yes, as it turns out, sharkonium does make it easier. Sharkonium grinding tools are way harder than any rock.",
            effectDesc: "Miller crabs are four times as effective. Manual labor!",
            cost: {
                science: 7500,
                sharkonium: 1000,
                gravel: 10000,
            },
            required: {
                upgrades: ["crabBiology", "pulverizer", "engineering"],
            },
            effect: {
                multiplier: {
                    miller: 4,
                },
            },
        },

        sharkoniumBreakingGear: {
            name: "Sharkonium Breaking Gear",
            desc: "Design better gear for breaking rocks, because it's really difficult!",
            researchedMessage:
                "Sharkonium rock-crackers have been developed and are being deployed to all rock lobsters.",
            effectDesc: "Rock lobsters are four times as effective. Manual labor!",
            cost: {
                science: 7500,
                sharkonium: 1250,
                stone: 7500,
            },
            required: {
                upgrades: ["crabBiology", "crusher", "engineering"],
            },
            effect: {
                multiplier: {
                    rockLobster: 4,
                },
            },
        },

        sharkoniumPickaxes: {
            name: "Sharkonium Pickaxes",
            desc: "These crystal pickaxes keep breaking! Maybe we should make some new ones...",
            researchedMessage:
                "As it turns out, sharkonium is perfect for the job! Crystals are literally flying off the walls! It's dangerous, but productive!",
            effectDesc: "Better pickaxes mean prospectors can break stone and crystal twice as fast.",
            cost: {
                science: 1200,
                sharkonium: 200,
            },
            required: {
                upgrades: ["transmutation", "prospectorSharks"],
            },
            effect: {
                multiplier: {
                    prospector: 2,
                },
            },
        },

        miningLights: {
            name: "Mining Lights",
            desc:
                "Now that I think about it, I guess it IS really dark in the caves...maybe we could invent some sort of...miniature suns to help?",
            researchedMessage: "It just so happens that seeing is beneficial to productivity. Who would've guessed?",
            effectDesc: "Being able to SEE makes prospectors four times faster underground.",
            cost: {
                science: 12000,
                sharkonium: 3500,
            },
            required: {
                upgrades: ["engineering", "sunObservation"],
            },
            effect: {
                multiplier: {
                    prospector: 4,
                },
            },
        },

        iterativeDesign: {
            name: "Iterative Design",
            desc:
                "The machines are good, but they could totally be better! Let's keep building them until they're better!",
            researchedMessage:
                "After hundreds of hours of testing, the final product has our machines running faster than ever!",
            effectDesc: "Machines are twice as fast.",
            cost: {
                science: 25000,
                sharkonium: 17500,
            },
            required: {
                upgrades: ["engineering"],
            },
            effect: {
                multiplier: {
                    crystalMiner: 2,
                    fishMachine: 2,
                    sandDigger: 2,
                    autoTransmuter: 2,
                    skimmer: 2,
                    crusher: 2,
                    pulverizer: 2,
                },
            },
        },

        exploration: {
            name: "Exploration",
            desc: "Swim beyond the home seas to see what can be found!",
            researchedMessage:
                "Found lots of schools of fish! So many different schools! And such untapped gravel reserves!",
            effectDesc: "Sharks, rays, and shovelers are twice as effective. Did you know oceans are big? Fascinating!",
            cost: {
                science: 5000,
                fish: 5000,
            },
            required: {
                upgrades: ["sunObservation"],
            },
            effect: {
                multiplier: {
                    shark: 2,
                    ray: 2,
                    shoveler: 2,
                },
            },
        },

        farExploration: {
            name: "Far Explorations",
            desc: "Explore the vast reaches beyond the home ocean.",
            researchedMessage: "Crystal-rich deposits were found, as well as strange, deep chasms.",
            effectDesc:
                "Crabs are four times as effective, and prospectors are doubly effective. Did you know oceans are actually even bigger than big? Remarkable!",
            cost: {
                science: 8000,
                fish: 15000,
            },
            required: {
                upgrades: ["exploration"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                    prospector: 2,
                },
            },
        },

        gateDiscovery: {
            name: "Chasm Exploration",
            desc: "A campaign of risky, foolhardy expeditions to the deeps, to find whatever can be found.",
            researchedMessage:
                "A strange structure was found from clues within the chasms. The cost was great, but the discovery is greater!",
            effectDesc: "Something ancient lurked in the depths.",
            cost: {
                science: 1e6,
                shark: 1000,
                fish: 50000,
            },
            required: {
                upgrades: ["farExploration"],
            },
        },

        // SUPERSCIENCE

        ancestralRecall: {
            name: "Ancestral Recall",
            desc:
                "The sharks and rays know we share some features among ourselves. Using the vague glimpses of dreams, let's piece together the puzzle.",
            researchedMessage:
                "Our giant ancestors and the creatures of a long distant past have inspired us to become even greater!",
            effectDesc:
                "Sharks, rays and chimaeras, and their roles, are all four times as effective. We have had a glorious past. Now, on to a glorious future.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery"],
                resources: ["shark", "ray", "chimaera"],
            },
            effect: {
                multiplier: {
                    shark: 4,
                    diver: 4,
                    science: 4,
                    nurse: 4,
                    ray: 4,
                    maker: 4,
                    laser: 4,
                    chimaera: 4,
                    transmuter: 4,
                    explorer: 4,
                },
            },
        },

        utilityCarapace: {
            name: "Utility Carapace",
            desc: "The exoskeleton is good enough, but with some adjustments, perhaps coralglass can improve it.",
            researchedMessage:
                "Coralglass carapace augmentation is a go! The crustaceans now carry their protection and their tools everywhere they go.",
            effectDesc:
                "Crabs, shrimp and lobsters, and their roles, are all four times as effective. A shell protects, and a shell interfaces.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "coralglassSmelting"],
                resources: ["crab", "shrimp", "lobster"],
            },
            effect: {
                multiplier: {
                    crab: 4,
                    brood: 4,
                    planter: 4,
                    shrimp: 4,
                    worker: 4,
                    queen: 4,
                    lobster: 4,
                    berrier: 4,
                    harvester: 4,
                },
            },
        },

        eightfoldOptimisation: {
            name: "Eightfold Optimisation",
            desc: "Enhance productivity. Optimise. Improve. Improve.",
            researchedMessage: "Peak productivity attained. Maintain course. Maintain efficiency.",
            effectDesc:
                "Octopuses and their roles, as well as their machines, are all four times as effective. Optimised.",
            cost: {
                science: 8e10,
            },
            required: {
                upgrades: ["gateDiscovery", "octalEfficiency"],
                resources: ["octopus"],
            },
            effect: {
                multiplier: {
                    octopus: 4,
                    collector: 4,
                    scavenger: 4,
                    clamCollector: 4,
                    eggBrooder: 4,
                    sprongeSmelter: 4,
                    seaScourer: 4,
                    prostheticPolyp: 4,
                },
            },
        },

        mechanisedAlchemy: {
            name: "Mechanised Alchemy",
            desc: "Better engineering and transmutation processes lead to a refinement of our machines.",
            researchedMessage: "We are blurring the line between science and magic more than ever before!",
            effectDesc:
                "Shark machines are all four times as effective. We work better with the machines, not against them.",
            cost: {
                science: 1e10,
            },
            required: {
                upgrades: ["gateDiscovery", "iterativeDesign"],
                resources: ["sharkonium"],
            },
            effect: {
                multiplier: {
                    fishMachine: 4,
                    crystalMiner: 4,
                    sandDigger: 4,
                    autoTransmuter: 4,
                    skimmer: 4,
                    crusher: 4,
                    pulverizer: 4,
                },
            },
        },
    },
};
