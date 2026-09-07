const plant = (name, latin, role, detail, history, change, nativeRange, timeScale, accent) => ({
  name,
  latin,
  role,
  detail,
  history,
  change,
  nativeRange,
  timeScale,
  accent,
});

const profiles = {
  China: {
    label: "China",
    coords: [104, 35],
    plants: [
      plant("Ginkgo", "Ginkgo biloba", "Ancient survivor", "A deciduous tree with fan-shaped leaves and distinctive forked veins. It is the only living species in its botanical class and is often called a living fossil.", "Wild populations once contracted to a few mountain refuges in eastern China. Centuries of cultivation around temples and villages helped the species survive beyond its natural range.", "Since the twentieth century, ginkgo has become a global city tree because it tolerates pollution and pruning. Protecting the genetic diversity of its remaining wild populations is still essential.", "Eastern and central China", "Lineage about 270 million years old", "#c8f08f"),
      plant("Dove tree", "Davidia involucrata", "China's handkerchief tree", "Its tiny flowers are framed by two large white bracts that make a flowering crown look as if it is filled with resting white doves.", "Plant collectors introduced it to Europe in the late nineteenth century, where it became a prized Chinese tree in botanical gardens.", "After the Ice Ages, its range retreated into mountain forests of south-central China. Habitat fragmentation now makes both in-situ and ex-situ conservation important.", "South-central China", "A Tertiary relict", "#e6f7dc"),
      plant("Chinese plum", "Prunus mume", "Harbinger of spring", "This tree flowers before its leaves unfold, often in the final cold weeks of winter. Its fruit is used for preserved plums, smoked ume and drinks.", "Cultivated in China for thousands of years, it moved from orchard to garden, poetry and painting as a symbol of resilience and early spring.", "Cultural exchange carried it across East Asia, while modern breeding has produced hundreds of ornamental forms.", "Yangtze basin and southern China", "Cultivated for about 3,000 years", "#ff9fb4"),
    ],
  },
  Japan: {
    label: "Japan",
    coords: [138, 36],
    plants: [
      plant("Yoshino cherry", "Prunus × yedoensis", "Spring messenger", "Clouds of pale pink flowers open before the leaves. Its short, synchronized bloom has become a defining feature of spring in Japanese cities.", "Gardeners in the village of Somei popularized this hybrid in the nineteenth century, and it spread rapidly across Japan during the Meiji era.", "Clonal propagation creates spectacularly uniform flowering, but it also leaves the cultivated population with a narrow genetic base.", "A Japanese garden hybrid", "Popularized about 150 years ago", "#ffb2c6"),
      plant("Japanese cedar", "Cryptomeria japonica", "Mountain-forest giant", "A tall evergreen conifer with a straight trunk that thrives in humid mountain forests and moss-rich landscapes.", "For centuries, its timber has been used for shrines, ships and buildings. Vast plantations established after the Second World War supplied construction wood.", "Plantation expansion altered some mountain ecosystems and increased seasonal pollen exposure. Current forestry increasingly favors mixed stands and biodiversity.", "Japan", "Used for more than 1,000 years", "#75d095"),
      plant("Japanese camellia", "Camellia japonica", "Late-winter bloom", "Glossy evergreen leaves frame waxy red, pink or white flowers that thrive in mild coastal forests and shaded gardens.", "An Edo-period horticultural fashion produced many cultivars, which later travelled to European glasshouses with merchants and botanists.", "Wild camellias remain part of East Asian warm-temperate forests, while garden varieties now grow across temperate regions worldwide.", "Japan and coastal East Asia", "About 400 years of garden history", "#f46f78"),
    ],
  },
  India: {
    label: "India",
    coords: [78, 21],
    plants: [
      plant("Banyan", "Ficus benghalensis", "A walking forest", "Aerial roots descend from spreading branches and become new supporting trunks, allowing one old tree to cover an extraordinary area.", "Banyans have long served as village meeting places and sacred spaces, while related figs are deeply rooted in South Asian spiritual traditions.", "Urban growth leaves less room for ancient spreading trees, but parks and sacred groves still protect large specimens and the wildlife they support.", "Indian subcontinent", "More than 2,000 years of cultural history", "#86d47a"),
      plant("Sacred lotus", "Nelumbo nucifera", "Flower above the water", "Water-repellent leaves, flowers and seed heads rise above ponds, while the underground rhizomes and seeds are edible.", "Across South Asian art and religion, the lotus represents purity emerging from muddy water, with images reaching back to ancient civilizations.", "Cultivation and waterways carried it across warm parts of Asia. Wetland loss has reduced some wild populations, although cultivation remains widespread.", "South Asia and warm Asian wetlands", "More than 3,000 years of cultural history", "#ff92bd"),
      plant("Neem", "Azadirachta indica", "Village medicine tree", "A drought-tolerant evergreen whose leaves, seeds and oil have long been used in farming and daily life.", "Neem twigs were traditionally used for dental care, its leaves for protecting stored grain and its shade as a village gathering place.", "It has been introduced throughout dry tropical regions for shelter, greening and botanical pest management; escape from cultivation requires monitoring in some areas.", "Indian subcontinent", "Used for more than 2,000 years", "#b6df68"),
    ],
  },
  Indonesia: {
    label: "Indonesia",
    coords: [118, -2],
    plants: [
      plant("Rafflesia", "Rafflesia arnoldii", "Rainforest giant flower", "This parasite has no visible leaves, stems or roots and spends most of its life inside a host vine. Its bloom is among the world's largest single flowers.", "A Sumatran expedition brought it into Western botanical literature in the early nineteenth century, although local communities had known the seasonal flower much earlier.", "It depends on intact rainforest, a specific host and pollinating insects. Fragmentation can break this small but complex ecological network.", "Rainforests of Sumatra and Borneo", "Scientifically described in 1818", "#f07c64"),
      plant("Titan arum", "Amorphophallus titanum", "Giant inflorescence", "A vast spathe surrounds a central spadix that heats up and releases a carrion-like scent to attract beetles and flies.", "Scientifically recorded in Sumatra in 1878, its rare flowering has since become a celebrated event in botanical gardens around the world.", "Its lowland rainforest habitat is shrinking. Botanical gardens maintain ex-situ populations through hand pollination and careful exchange of genetic lines.", "Western Sumatra", "Scientifically recorded in 1878", "#c86f91"),
      plant("Clove", "Syzygium aromaticum", "Tree of the Spice Islands", "The dried unopened flower buds are cloves, rich in aromatic eugenol and valued for flavor and preservation.", "For centuries, cloves grew commercially almost only in the Maluku Islands, driving ocean trade and colonial competition for control of their source.", "Seedlings were carried to other Indian Ocean islands after the eighteenth century, dispersing production while Maluku retained important genetic resources.", "Maluku Islands, Indonesia", "More than 1,500 years of trade history", "#ffad62"),
    ],
  },
  Singapore: {
    label: "Singapore",
    coords: [103.82, 1.35],
    plants: [
      plant("Vanda Miss Joaquim", "Papilionanthe Miss Joaquim", "National orchid", "A heat-tolerant hybrid orchid with long-lasting violet-pink flowers that thrive in tropical sun.", "Horticulturist Agnes Joaquim raised the hybrid in 1893. It was selected as Singapore's national flower in 1981.", "A private garden hybrid became part of public planting and national identity, accompanying the continuing development of Singapore as a garden city.", "A horticultural hybrid from Singapore", "Raised in 1893", "#d79dff"),
      plant("Tembusu", "Cyrtophyllum fragrans", "Old rainforest tree", "A native tree with deeply fissured bark, small cream flowers scented at dusk and fruit that attracts birds.", "A famous heritage tembusu in the Singapore Botanic Gardens appears on the reverse of the five-dollar note.", "After much primary forest was lost, old trees survived mainly in reserves and parks. Native species are now returning through ecological restoration.", "Lowland forests of Southeast Asia", "Individual trees may live for centuries", "#ffd889"),
      plant("Mangrove", "Rhizophora spp.", "Intertidal barrier", "Stilt roots stabilize soft mud, soften waves and create nursery habitat for fish, crabs and migratory birds.", "Mangroves once covered much more of Singapore's coast and supplied fuel, tannins and near-shore food resources.", "Reclamation and urban growth reduced their extent, while protection and restoration at places such as Sungei Buloh reconnect intertidal habitat.", "Singapore's intertidal coast", "Under continuing restoration", "#69d6b3"),
    ],
  },
  Australia: {
    label: "Australia",
    coords: [134, -25],
    plants: [
      plant("Eucalyptus", "Eucalyptus spp.", "Renewed by fire", "Oil-rich leaves and fire-adapted buds allow many species to resprout after burning. Eucalypts form the structural backbone of many Australian ecosystems.", "Aboriginal peoples have long used the leaves, bark and wood for medicine, containers and tools. European settlement later spread eucalypts globally as fast-growing timber trees.", "Plantations now occur across warm regions worldwide. In Australia, more frequent extreme fires are changing the rhythm of forest recovery.", "Australia", "A lineage about 50 million years old", "#78cbb4"),
      plant("Banksia", "Banksia spp.", "Nectar tower", "Cylindrical flower spikes contain hundreds of nectar-rich flowers, and many woody seed heads release their seeds after fire.", "Joseph Banks collected specimens at Botany Bay in 1770, inspiring the genus name, though Aboriginal knowledge and use long predated his visit.", "Urban expansion and altered fire regimes threaten some narrow-range species. Seed banks and controlled burning support their renewal.", "Australia", "Used for at least 15,000 years", "#f3b85b"),
      plant("Grass tree", "Xanthorrhoea spp.", "Dark pillar of time", "A slow-growing crown of narrow leaves rises from a trunk often blackened by fire, followed by a tall flowering spike after rain or burning.", "Its resin, nectar and flower stems have many Aboriginal uses, while the dark trunk records repeated encounters with fire.", "Mature plants can be centuries old, so land clearing, disease and illegal collection leave losses that are exceptionally slow to replace.", "Australia", "Individuals may live for centuries", "#b7d477"),
    ],
  },
  Brazil: {
    label: "Brazil",
    coords: [-52, -10],
    plants: [
      plant("Brazilwood", "Paubrasilia echinata", "The tree behind a country's name", "An Atlantic Forest tree with red heartwood once prized for dye and still valued for the acoustic qualities of violin bows.", "Colonial exporters felled it extensively from the sixteenth century, and the wood's name, brasil, eventually became the name of the country.", "Centuries of logging and coastal development greatly reduced its wild range. Trade is now controlled and restoration combines protected areas with cultivation.", "Brazilian Atlantic Forest", "About 500 years of trade history", "#e96e52"),
      plant("Rubber tree", "Hevea brasiliensis", "Tree of latex", "Tapping the bark releases a milky latex that remains the main natural source of rubber.", "The nineteenth-century Amazon rubber boom enriched river cities. Seeds later reached Asia, shifting the center of world production eastward.", "Wild genetic diversity remains concentrated in Amazonia, while commercial plantations dominate Southeast Asia and increasingly rely on disease-resistant breeding.", "Amazon basin", "Transformed industry in the nineteenth century", "#8ddc91"),
      plant("Giant Amazon water lily", "Victoria amazonica", "Giant floating leaf", "Huge round leaves use radiating ribs and air-filled tissues to support remarkable weight, while short-lived flowers change color and generate heat.", "European glasshouses competed to cultivate it in the nineteenth century, inspiring new wide-span greenhouse engineering.", "It remains native to slow Amazonian waters, where hydrological change affects its habitat, and is conserved in botanical gardens worldwide.", "Amazon river basin", "Named in 1837", "#f0a5de"),
    ],
  },
  Mexico: {
    label: "Mexico",
    coords: [-102, 23],
    plants: [
      plant("Blue agave", "Agave tequilana", "Desert rosette", "A rosette of succulent leaves stores water for years before a single flowering event. Its sugar-rich heart is used to make tequila.", "People used agave fiber and fermented sap long before European contact; colonial distillation helped shape modern tequila.", "Expanding plantations increasingly rely on uniform clones, improving consistency while raising disease risks and interest in greater genetic diversity.", "Jalisco and neighboring Mexico", "Used for more than 2,000 years", "#78cbd0"),
      plant("Dahlia", "Dahlia spp.", "Highland tuber flower", "These perennial members of the daisy family store energy underground and have been bred into an extraordinary range of colors and flower forms.", "The Aztecs used dahlias for food and medicine. After reaching Europe in the late eighteenth century, they became major garden-breeding plants.", "Tens of thousands of cultivars now grow worldwide, while Mexico's wild species remain vital sources of disease resistance and other traits.", "Highlands of Mexico and Central America", "Reached Europe in 1789", "#ff7e91"),
      plant("Aztec marigold", "Tagetes erecta", "Flower of the Day of the Dead", "Bright orange and yellow flower heads contain aromatic compounds and are used in food, dyes and companion planting.", "In Day of the Dead traditions, paths of petals are believed to guide departed loved ones home.", "From Central America it became a global bedding plant and a source of natural pigments for food and feed industries.", "Mexico and Central America", "Centuries of ceremonial tradition", "#ffad42"),
    ],
  },
  "United States of America": {
    label: "United States",
    coords: [-98, 39],
    plants: [
      plant("Giant sequoia", "Sequoiadendron giganteum", "Mountain giant", "Among the largest trees on Earth by volume, it has insulating bark and cones that release seed more readily after fire.", "Nineteenth-century logging destroyed parts of the groves, while the parks created around surviving trees became landmarks in large-scale conservation.", "Natural groves remain limited to the western Sierra Nevada. Warming, drought and severe fire increasingly exceed their historical tolerance.", "California, United States", "Individuals may exceed 3,000 years", "#89c980"),
      plant("Saguaro", "Carnegiea gigantea", "Desert water tower", "This columnar cactus stores seasonal rain and develops arm-like branches with age; its flowers and fruit sustain many desert animals.", "The Tohono O'odham have long organized harvest traditions around its fruit, making the saguaro a cultural landmark of the Sonoran Desert.", "Young plants depend on rare wet years and nurse plants. Heat, drought and urban expansion are changing the conditions needed for renewal.", "Sonoran Desert of the United States and Mexico", "A lifespan of up to 150 years", "#b8dc6d"),
      plant("Common sunflower", "Helianthus annuus", "Sun-following oil crop", "Its large head is made of many small flowers, and young plants often track the sun. Oil-rich seeds support both wildlife and agriculture.", "Indigenous peoples domesticated sunflower in North America thousands of years ago. It later reached Europe and became a major oil crop in Russia.", "Modern cultivation spans continents, while wild relatives continue to supply important drought- and disease-resistance traits.", "North America", "Domesticated about 4,000 years ago", "#ffd153"),
    ],
  },
  Canada: {
    label: "Canada",
    coords: [-106, 56],
    plants: [
      plant("Sugar maple", "Acer saccharum", "Sap and autumn color", "Warm days and freezing nights drive sweet sap in spring, while its autumn leaves turn from gold to deep red.", "Indigenous peoples developed methods for collecting and concentrating maple sap long before it became a symbol of Canadian food culture.", "Mature maple forests are expected to favor cooler northern conditions as warming, drought and introduced pests reshape future production.", "Southeastern Canada and northeastern United States", "Traditional harvest for more than 1,000 years", "#f28a62"),
      plant("Canada yew", "Taxus canadensis", "Evergreen forest floor", "This low, spreading conifer shelters wildlife in northern forests, although most parts contain toxic alkaloids.", "Indigenous knowledge guided its careful traditional use, and modern research has examined medicinal compounds found across the yew family.", "Heavy browsing by deer can remove local populations, while changes in forest structure alter the cool, shaded habitat it needs.", "Canada and the northeastern United States", "An ancient member of northern forests", "#6dc58d"),
      plant("Fireweed", "Chamaenerion angustifolium", "Pioneer after disturbance", "It quickly colonizes burned or cleared ground through spreading rhizomes, and its pink-purple flowers provide abundant nectar.", "Its appearance in bomb-damaged European cities during the Second World War made it an enduring symbol of recovery.", "It is widespread across the cool Northern Hemisphere, where fire, treelines and changing seasons continually rearrange its distribution.", "Cool regions of the Northern Hemisphere", "An early-succession species", "#db87dc"),
    ],
  },
  France: {
    label: "France",
    coords: [2, 46],
    plants: [
      plant("True lavender", "Lavandula angustifolia", "Highland aromatic", "Narrow silver-green leaves and violet flower spikes are rich in aromatic oil and favor sunny, dry, well-drained slopes.", "From monastery herb gardens to the perfume industry of Provence, lavender became one of southern France's most recognizable cultivated landscapes.", "Warming and disease pressure low-elevation fields, encouraging some production to move into cooler, higher ground.", "Southern France and Mediterranean mountains", "About 200 years of commercial cultivation", "#b89cff"),
      plant("Iris", "Iris spp.", "Royal floral emblem", "Sword-shaped leaves and complex flowers make irises distinctive, with different species adapted to wetlands, meadows and limestone slopes.", "The fleur-de-lis of French heraldry is often interpreted as a stylized iris and has appeared in decorative arts and gardens for centuries.", "Land-use change affects wild wetland and grassland species, while horticultural breeding continues to expand color and form.", "Europe and the wider Northern Hemisphere", "More than 800 years in heraldry", "#80aaf4"),
      plant("Grapevine", "Vitis vinifera", "A crop shaped by terroir", "This woody vine produces fruit whose sugar and acidity reflect soil, slope and microclimate, creating the differences described as terroir.", "Romans expanded vineyards in Gaul, and medieval monasteries later divided and documented plots that helped define many wine regions.", "Phylloxera devastated European vineyards in the nineteenth century before grafting onto American rootstocks enabled recovery. Climate change is again shifting varieties and regions northward.", "Mediterranean and western Asian origin; widely grown in France", "Cultivated in France for about 2,000 years", "#8fcf72"),
    ],
  },
  "South Africa": {
    label: "South Africa",
    coords: [24, -29],
    plants: [
      plant("King protea", "Protea cynaroides", "Royal flower of the Cape", "Large pink bracts surround many small flowers, while underground buds help some plants resprout after fire.", "The genus was named for the shape-shifting Greek god Proteus, reflecting its extraordinary diversity. The king protea became South Africa's national flower in 1976.", "Urban growth, invasive plants and unsuitable fire intervals are compressing habitat in the highly endemic Cape Floristic Region.", "Cape Floristic Region, South Africa", "An ancient Gondwanan lineage", "#f19aae"),
      plant("Silver tree", "Leucadendron argenteum", "A silver hillside", "Fine hairs make the leaves shine silver in sunlight, and mature female plants protect their seeds in woody cones.", "The tree once gave the lower slopes of Table Mountain a famous silvery appearance recorded by early travellers.", "Its natural range is extremely narrow, and urbanization, altered fire patterns and invasive trees have made it vulnerable.", "Cape Peninsula, South Africa", "A narrow-range endemic", "#c8ddd5"),
      plant("Bird of paradise", "Strelitzia reginae", "Orange-and-blue bird", "Orange sepals and blue petals emerge from a boat-shaped bract, pollinated when nectar-feeding birds land on the flower.", "After reaching Europe in the eighteenth century, it was named for Queen Charlotte's home region of Mecklenburg-Strelitz.", "It is now a garden plant throughout warm regions, while wild populations remain in coastal scrub and forest margins of eastern South Africa.", "Eastern South Africa", "Named in 1773", "#ff9a63"),
    ],
  },
  Egypt: {
    label: "Egypt",
    coords: [30, 26],
    plants: [
      plant("Papyrus", "Cyperus papyrus", "Plant of the Nile", "This tall wetland sedge has green firework-like flower heads, and its soft stem pith can be sliced and pressed into writing material.", "Ancient Egyptians made scrolls, boats, baskets and rope from papyrus, which also became part of the visual language of a united Egypt.", "Wild papyrus declined sharply in Egypt, but wetland restoration and cultivation are bringing it back to selected places.", "Nile basin and African wetlands", "Used for more than 5,000 years", "#68d1b1"),
      plant("Blue lotus", "Nymphaea caerulea", "Flower of sunrise", "Blue flowers open by day and close at night in warm, shallow water.", "Its daily movement with the sun connected it with rebirth in ancient Egypt, where it appears repeatedly in tomb paintings and objects.", "Water engineering and wetland change affected its Nile habitat, while garden cultivation carried it into tropical water gardens worldwide.", "Nile and East African waters", "More than 3,000 years of visual history", "#79aef4"),
      plant("Date palm", "Phoenix dactylifera", "Food store of the oasis", "A drought-tolerant palm with deep roots and sweet fruit that can be eaten fresh or stored for long periods.", "Date cultivation supported oasis cities and trade routes across North Africa and western Asia, with hand pollination practiced for millennia.", "Traditional varieties now face falling groundwater, salinity and pests, while genetic collections preserve traits for future climates.", "Oases of North Africa and western Asia", "Domesticated about 6,000 years ago", "#e9b66e"),
    ],
  },
  Madagascar: {
    label: "Madagascar",
    coords: [47, -19],
    plants: [
      plant("Grandidier's baobab", "Adansonia grandidieri", "Water-storing giant", "Its massive columnar trunk stores water and loses its leaves in the dry season, while the high crown gives the tree its upside-down silhouette.", "Communities in western Madagascar have long treated baobabs as landmarks, food sources and spiritual spaces.", "Agricultural expansion and poor seedling recruitment continue to pressure wild populations; the Avenue of the Baobabs has become a focus for tourism and conservation.", "Western Madagascar", "An island endemic", "#d9b06b"),
      plant("Traveller's tree", "Ravenala madagascariensis", "Fan of rainwater", "Huge leaves form a single fan and collect rain in their sheaths. Despite its name and appearance, it is related to bird-of-paradise plants rather than palms.", "Its unmistakable silhouette became an emblem of Madagascar and a familiar feature of tropical gardens abroad.", "Cultivation has carried it far beyond the island, while wild populations in Madagascar vary across habitats and may represent distinct evolutionary groups.", "Madagascar", "A distinctive island lineage", "#75cfc1"),
      plant("Madagascar periwinkle", "Catharanthus roseus", "A small flower with global medicine", "This evergreen herb bears pink or white flowers and produces powerful alkaloids as chemical defenses.", "Research on its compounds led to vincristine and vinblastine, medicines that transformed treatment for several cancers.", "It is now cultivated and naturalized across the tropics, while Madagascar's native populations remain an important source of genetic diversity.", "Madagascar", "Modern medical use since the 1950s", "#f39ab8"),
    ],
  },
  "New Zealand": {
    label: "New Zealand",
    coords: [172, -41],
    plants: [
      plant("Silver fern", "Alsophila dealbata", "Silver forest frond", "The pale undersides of mature fronds flash silver when turned, making this tree fern one of New Zealand's best-known natural emblems.", "Māori used silver fronds as markers in the forest, and the form later became a national symbol in sport, design and public identity.", "Forest clearance reduced its former habitat, but it remains widespread in recovering native forest and protected areas.", "New Zealand", "A long-standing cultural emblem", "#b9d8c8"),
      plant("Pōhutukawa", "Metrosideros excelsa", "New Zealand Christmas tree", "Brilliant crimson flowers open around the southern summer holidays, and strong roots grip coastal cliffs and lava.", "Its flowering season inspired the English name New Zealand Christmas tree, while the species has deep significance in Māori landscapes and tradition.", "Introduced browsing animals and habitat loss damaged many stands; fencing, pest control and community planting support coastal recovery.", "Northern New Zealand coast", "Long-lived coastal tree", "#ed6d62"),
      plant("Kauri", "Agathis australis", "Ancient forest pillar", "A vast straight trunk rises above the forest canopy, and old trees create distinctive soil and plant communities beneath them.", "Kauri timber and gum drove nineteenth-century industry, after centuries of Māori use and reverence for the largest trees.", "Logging removed most old-growth forest. Today kauri dieback disease makes hygiene, monitoring and forest access management central to protection.", "Northern New Zealand", "A lineage more than 100 million years old", "#8cc486"),
    ],
  },
};

const fallbackProfiles = {
  tropical: {
    label: "Tropical ecosystem",
    plants: [
      plant("Mangrove", "Rhizophora spp.", "Tidal forest", "Stilt roots stabilize shorelines and create sheltered habitat between land and sea.", "Coastal communities have long relied on mangroves for food, fuel and protection.", "Aquaculture and development reduced many forests, while restoration is reconnecting tidal habitat.", "Tropical coasts", "Ancient coastal lineage", "#69d6b3"),
      plant("Cacao", "Theobroma cacao", "Rainforest crop", "Small flowers grow directly from the trunk and develop into pods containing cocoa beans.", "Mesoamerican cultures prepared cacao drinks long before chocolate became a global commodity.", "Cultivation spread through the tropics, where shade-grown systems can protect more biodiversity than exposed monocultures.", "Tropical Americas", "Cultivated for more than 3,000 years", "#c98d65"),
      plant("Swiss cheese plant", "Monstera deliciosa", "Forest climber", "Large split leaves help this climbing aroid live beneath a humid tropical canopy.", "Its dramatic foliage moved from American rainforests into homes and gardens around the world.", "It is widely cultivated and has naturalized in some warm regions outside its native range.", "Tropical Central America", "Global houseplant since the twentieth century", "#81c987"),
    ],
  },
  boreal: {
    label: "Boreal forest",
    plants: [
      plant("Spruce", "Picea spp.", "Northern conifer", "Needle-like leaves and conical crowns shed snow and withstand long winters.", "Spruce wood has supported northern building, paper, instruments and Indigenous material cultures.", "Warming, drought, fire and bark beetles are reshaping boreal forests across the Northern Hemisphere.", "Northern Hemisphere", "Dominant since the post-glacial period", "#75aa88"),
      plant("Birch", "Betula spp.", "Pioneer of light", "Pale bark and wind-borne seeds allow birches to colonize open ground after disturbance.", "Flexible bark has been used for containers, roofing, writing and canoes in many northern cultures.", "As treelines move and disturbance patterns change, birch ranges and forest mixtures are being rearranged.", "Cool Northern Hemisphere", "Post-glacial pioneer", "#d4dfca"),
      plant("Cloudberry", "Rubus chamaemorus", "Amber berry of the north", "A low plant of cool bogs that produces amber fruit rich in vitamin C.", "Cloudberries have long been gathered and preserved across northern Eurasia and North America.", "Warmer, drier bogs and changing snow cover can disrupt flowering and fruit production.", "Arctic and boreal wetlands", "Traditional northern food", "#efb66c"),
    ],
  },
  temperate: {
    label: "Northern temperate ecosystem",
    plants: [
      plant("Oak", "Quercus spp.", "Long-lived canopy tree", "Oaks produce acorns and support exceptionally rich communities of insects, birds and fungi.", "Their timber, bark and fruit have shaped food systems, ships, buildings and woodland traditions.", "Land use, introduced pests and climate shifts are changing the composition of temperate oak forests.", "Northern Hemisphere", "A lineage about 55 million years old", "#91bd72"),
      plant("Wild rose", "Rosa spp.", "Flower of hedges and hills", "Open flowers feed insects, while hips provide fruit for wildlife through autumn and winter.", "Wild roses became the genetic foundation of centuries of garden breeding and symbolism.", "Habitat change affects local species, while cultivated roses have spread far beyond their native ranges.", "Temperate and subtropical Northern Hemisphere", "Cultivated for more than 2,000 years", "#e99ab7"),
      plant("Poppy", "Papaver spp.", "Flower after disturbance", "Delicate bright petals surround dense stamens, and dormant seed can wait in soil for disturbance.", "Different poppies have long appeared in food, medicine and remembrance; the red poppy became a symbol of wartime memory.", "Modern weed control reduced some field populations, while wildflower strips and urban meadows create new refuges.", "Temperate Eurasia", "More than 1,000 years of cultural records", "#f06f66"),
    ],
  },
  southern: {
    label: "Southern temperate ecosystem",
    plants: [
      plant("Araucaria", "Araucaria spp.", "Gondwanan survivor", "Whorled branches and tough scale-like leaves give these trees a distinctive geometry.", "Their lineage reaches back to the age of dinosaurs and was divided as the southern continents separated.", "Logging and habitat loss threaten several species, while international seed banks protect genetic diversity.", "South America and Oceania", "A lineage about 200 million years old", "#77bf8b"),
      plant("Tussock grass", "Poa & Chionochloa spp.", "Grass of windy ground", "Dense leaf clumps protect growing points from wind, cold and seasonal drought.", "Fire and grazing have shaped grassland boundaries across southern highlands and open country.", "Livestock, introduced animals and warming are changing the balance between grassland and shrubland.", "Southern temperate regions and highlands", "An ancient grassland community", "#d3cf78"),
      plant("Tree fern", "Cyatheales", "Canopy beneath the canopy", "Its upright trunk is built from roots and old leaf bases, topped by a crown of giant fronds.", "Tree ferns evoke ancient forests because their lineage had already diversified in the age of dinosaurs.", "Clearing and drying reduce local populations, while protected forests and spore propagation support recovery.", "Humid tropical and temperate forests", "A lineage more than 200 million years old", "#85d2a1"),
    ],
  },
};
