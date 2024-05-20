import { Injectable } from '@angular/core';
import { PeriodicElement } from './periodic-element';
import { Observable, of } from 'rxjs';

const ELEMENT_DATA: PeriodicElement[] = [
  // {
  //   position: 1,
  //   name: 'Hydrogen',
  //   weight: 1.0079,
  //   symbol: 'H',
  //   description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
  //       atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  // },
  // {
  //   position: 2,
  //   name: 'Helium',
  //   weight: 4.0026,
  //   symbol: 'He',
  //   description: `Helium is a chemical element with symbol He and atomic number 2. It is a
  //       colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
  //       group in the periodic table. Its boiling point is the lowest among all the elements.`,
  // },
  // {
  //   position: 3,
  //   name: 'Lithium',
  //   weight: 6.941,
  //   symbol: 'Li',
  //   description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
  //       silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
  //       lightest solid element.`,
  // },
  // {
  //   position: 4,
  //   name: 'Beryllium',
  //   weight: 9.0122,
  //   symbol: 'Be',
  //   description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
  //       relatively rare element in the universe, usually occurring as a product of the spallation of
  //       larger atomic nuclei that have collided with cosmic rays.`,
  // },
  // {
  //   position: 5,
  //   name: 'Boron',
  //   weight: 10.811,
  //   symbol: 'B',
  //   description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
  //       by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
  //       low-abundance element in the Solar system and in the Earth's crust.`,
  // },
  // {
  //   position: 6,
  //   name: 'Carbon',
  //   weight: 12.0107,
  //   symbol: 'C',
  //   description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
  //       and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
  //       to group 14 of the periodic table.`,
  // },
  // {
  //   position: 7,
  //   name: 'Nitrogen',
  //   weight: 14.0067,
  //   symbol: 'N',
  //   description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
  //       discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  // },
  // {
  //   position: 8,
  //   name: 'Oxygen',
  //   weight: 15.9994,
  //   symbol: 'O',
  //   description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
  //        the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
  //        agent that readily forms oxides with most elements as well as with other compounds.`,
  // },
  // {
  //   position: 9,
  //   name: 'Fluorine',
  //   weight: 18.9984,
  //   symbol: 'F',
  //   description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
  //       lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
  //       conditions.`,
  // },
  // {
  //   position: 10,
  //   name: 'Neon',
  //   weight: 20.1797,
  //   symbol: 'Ne',
  //   description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
  //       Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
  //       two-thirds the density of air.`,
  // },

  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.008,
    description:
      'Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the Universe, constituting roughly 75% of all baryonic mass.',
    symbol: 'H',
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026022,
    description:
      'Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among all the elements.',
    symbol: 'He',
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.94,
    description:
      'Lithium (from Greek:λίθος lithos, "stone") is a chemical element with the symbol Li and atomic number 3. It is a soft, silver-white metal belonging to the alkali metal group of chemical elements. Under standard conditions it is the lightest metal and the least dense solid element.',
    symbol: 'Li',
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.01218315,
    description:
      'Beryllium is a chemical element with symbol Be and atomic number 4. It is created through stellar nucleosynthesis and is a relatively rare element in the universe. It is a divalent element which occurs naturally only in combination with other elements in minerals.',
    symbol: 'Be',
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.81,
    description:
      "Boron is a metalloid chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in both the Solar system and the Earth's crust. Boron is concentrated on Earth by the water-solubility of its more common naturally occurring compounds, the borate minerals.",
    symbol: 'B',
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.011,
    description:
      'Carbon (from Latin:carbo "coal") is a chemical element with symbol C and atomic number 6. On the periodic table, it is the first (row 2) of six elements in column (group) 14, which have in common the composition of their outer electron shell. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds.',
    symbol: 'C',
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.007,
    description:
      'Nitrogen is a chemical element with symbol N and atomic number 7. It is the lightest pnictogen and at room temperature, it is a transparent, odorless diatomic gas. Nitrogen is a common element in the universe, estimated at about seventh in total abundance in the Milky Way and the Solar System.',
    symbol: 'N',
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.999,
    description:
      'Oxygen is a chemical element with symbol O and atomic number 8. It is a member of the chalcogen group on the periodic table and is a highly reactive nonmetal and oxidizing agent that readily forms compounds (notably oxides) with most elements. By mass, oxygen is the third-most abundant element in the universe, after hydrogen and helium.',
    symbol: 'O',
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984031636,
    description:
      'Fluorine is a chemical element with symbol F and atomic number 9. It is the lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard conditions. As the most electronegative element, it is extremely reactive:almost all other elements, including some noble gases, form compounds with fluorine.',
    symbol: 'F',
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.17976,
    description:
      'Neon is a chemical element with symbol Ne and atomic number 10. It is in group 18 (noble gases) of the periodic table. Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about two-thirds the density of air.',
    symbol: 'Ne',
  },
  {
    position: 11,
    name: 'Sodium',
    weight: 22.989769282,
    description:
      'Sodium /ˈsoʊdiəm/ is a chemical element with symbol Na (from Ancient Greek Νάτριο) and atomic number 11. It is a soft, silver-white, highly reactive metal. In the Periodic table it is in column 1 (alkali metals), and shares with the other six elements in that column that it has a single electron in its outer shell, which it readily donates, creating a positively charged atom - a cation.',
    symbol: 'Na',
  },
  {
    position: 12,
    name: 'Magnesium',
    weight: 24.305,
    description:
      'Magnesium is a chemical element with symbol Mg and atomic number 12. It is a shiny gray solid which bears a close physical resemblance to the other five elements in the second column (Group 2, or alkaline earth metals) of the periodic table:they each have the same electron configuration in their outer electron shell producing a similar crystal structure. Magnesium is the ninth most abundant element in the universe.',
    symbol: 'Mg',
  },
  {
    position: 13,
    name: 'Aluminium',
    weight: 26.98153857,
    description:
      "Aluminium (or aluminum; see different endings) is a chemical element in the boron group with symbol Al and atomic number 13. It is a silvery-white, soft, nonmagnetic, ductile metal. Aluminium is the third most abundant element (after oxygen and silicon), and the most abundant metal, in the Earth's crust.",
    symbol: 'Al',
  },
  {
    position: 14,
    name: 'Silicon',
    weight: 28.085,
    description:
      "Silicon is a chemical element with symbol Si and atomic number 14. It is a tetravalent metalloid, more reactive than germanium, the metalloid directly below it in the table. Controversy about silicon's character dates to its discovery.",
    symbol: 'Si',
  },
  {
    position: 15,
    name: 'Phosphorus',
    weight: 30.9737619985,
    description:
      'Phosphorus is a chemical element with symbol P and atomic number 15. As an element, phosphorus exists in two major forms—white phosphorus and red phosphorus—but due to its high reactivity, phosphorus is never found as a free element on Earth. Instead phosphorus-containing minerals are almost always present in their maximally oxidised state, as inorganic phosphate rocks.',
    symbol: 'P',
  },
  {
    position: 16,
    name: 'Sulfur',
    weight: 32.06,
    description:
      'Sulfur or sulphur (see spelling differences) is a chemical element with symbol S and atomic number 16. It is an abundant, multivalent non-metal. Under normal conditions, sulfur atoms form cyclic octatomic molecules with chemical formula S8.',
    symbol: 'S',
  },
  {
    position: 17,
    name: 'Chlorine',
    weight: 35.45,
    description:
      'Chlorine is a chemical element with symbol Cl and atomic number 17. It also has a relative atomic mass of 35.5. Chlorine is in the halogen group (17) and is the second lightest halogen following fluorine.',
    symbol: 'Cl',
  },
  {
    position: 18,
    name: 'Argon',
    weight: 39.9481,
    description:
      "Argon is a chemical element with symbol Ar and atomic number 18. It is in group 18 of the periodic table and is a noble gas. Argon is the third most common gas in the Earth's atmosphere, at 0.934% (9,340 ppmv), making it over twice as abundant as the next most common atmospheric gas, water vapor (which averages about 4000 ppmv, but varies greatly), and 23 times as abundant as the next most common non-condensing atmospheric gas, carbon dioxide (400 ppmv), and more than 500 times as abundant as the next most common noble gas, neon (18 ppmv).",
    symbol: 'Ar',
  },
  {
    position: 19,
    name: 'Potassium',
    weight: 39.09831,
    description:
      'Potassium is a chemical element with symbol K (derived from Neo-Latin, kalium) and atomic number 19. It was first isolated from potash, the ashes of plants, from which its name is derived. In the Periodic table, potassium is one of seven elements in column (group) 1 (alkali metals):they all have a single valence electron in their outer electron shell, which they readily give up to create an atom with a positive charge - a cation, and combine with anions to form salts.',
    symbol: 'K',
  },
  {
    position: 20,
    name: 'Calcium',
    weight: 40.0784,
    description:
      "Calcium is a chemical element with symbol Ca and atomic number 20. Calcium is a soft gray alkaline earth metal, fifth-most-abundant element by mass in the Earth's crust. The ion Ca2+ is also the fifth-most-abundant dissolved ion in seawater by both molarity and mass, after sodium, chloride, magnesium, and sulfate.",
    symbol: 'Ca',
  },
  {
    position: 21,
    name: 'Scandium',
    weight: 44.9559085,
    description:
      'Scandium is a chemical element with symbol Sc and atomic number 21. A silvery-white metallic d-block element, it has historically been sometimes classified as a rare earth element, together with yttrium and the lanthanoids. It was discovered in 1879 by spectral analysis of the minerals euxenite and gadolinite from Scandinavia.',
    symbol: 'Sc',
  },
  {
    position: 22,
    name: 'Titanium',
    weight: 47.8671,
    description:
      'Titanium is a chemical element with symbol Ti and atomic number 22. It is a lustrous transition metal with a silver color, low density and high strength. It is highly resistant to corrosion in sea water, aqua regia and chlorine.',
    symbol: 'Ti',
  },
  {
    position: 23,
    name: 'Vanadium',
    weight: 50.94151,
    description:
      'Vanadium is a chemical element with symbol V and atomic number 23. It is a hard, silvery grey, ductile and malleable transition metal. The element is found only in chemically combined form in nature, but once isolated artificially, the formation of an oxide layer stabilizes the free metal somewhat against further oxidation.',
    symbol: 'V',
  },
  {
    position: 24,
    name: 'Chromium',
    weight: 51.99616,
    description:
      'Chromium is a chemical element with symbol Cr and atomic number 24. It is the first element in Group 6. It is a steely-gray, lustrous, hard and brittle metal which takes a high polish, resists tarnishing, and has a high melting point.',
    symbol: 'Cr',
  },
  {
    position: 25,
    name: 'Manganese',
    weight: 54.9380443,
    description:
      'Manganese is a chemical element with symbol Mn and atomic number 25. It is not found as a free element in nature; it is often found in combination with iron, and in many minerals. Manganese is a metal with important industrial metal alloy uses, particularly in stainless steels.',
    symbol: 'Mn',
  },
  {
    position: 26,
    name: 'Iron',
    weight: 55.8452,
    description:
      "Iron is a chemical element with symbol Fe (from Latin:ferrum) and atomic number 26. It is a metal in the first transition series. It is by mass the most common element on Earth, forming much of Earth's outer and inner core.",
    symbol: 'Fe',
  },
  {
    position: 27,
    name: 'Cobalt',
    weight: 58.9331944,
    description:
      "Cobalt is a chemical element with symbol Co and atomic number 27. Like nickel, cobalt in the Earth's crust is found only in chemically combined form, save for small deposits found in alloys of natural meteoric iron. The free element, produced by reductive smelting, is a hard, lustrous, silver-gray metal.",
    symbol: 'Co',
  },
  {
    position: 28,
    name: 'Nickel',
    weight: 58.69344,
    description:
      'Nickel is a chemical element with symbol Ni and atomic number 28. It is a silvery-white lustrous metal with a slight golden tinge. Nickel belongs to the transition metals and is hard and ductile.',
    symbol: 'Ni',
  },
  {
    position: 29,
    name: 'Copper',
    weight: 63.5463,
    description:
      'Copper is a chemical element with symbol Cu (from Latin:cuprum) and atomic number 29. It is a soft, malleable and ductile metal with very high thermal and electrical conductivity. A freshly exposed surface of pure copper has a reddish-orange color.',
    symbol: 'Cu',
  },
  {
    position: 30,
    name: 'Zinc',
    weight: 65.382,
    description:
      'Zinc, in commerce also spelter, is a chemical element with symbol Zn and atomic number 30. It is the first element of group 12 of the periodic table. In some respects zinc is chemically similar to magnesium:its ion is of similar size and its only common oxidation state is +2.',
    symbol: 'Zn',
  },
  {
    position: 31,
    name: 'Gallium',
    weight: 69.7231,
    description:
      'Gallium is a chemical element with symbol Ga and atomic number 31. Elemental gallium does not occur in free form in nature, but as the gallium(III) compounds that are in trace amounts in zinc ores and in bauxite. Gallium is a soft, silvery metal, and elemental gallium is a brittle solid at low temperatures, and melts at 29.76 °C (85.57 °F) (slightly above room temperature).',
    symbol: 'Ga',
  },
  {
    position: 32,
    name: 'Germanium',
    weight: 72.6308,
    description:
      'Germanium is a chemical element with symbol Ge and atomic number 32. It is a lustrous, hard, grayish-white metalloid in the carbon group, chemically similar to its group neighbors tin and silicon. Purified germanium is a semiconductor, with an appearance most similar to elemental silicon.',
    symbol: 'Ge',
  },
  {
    position: 33,
    name: 'Arsenic',
    weight: 74.9215956,
    description:
      'Arsenic is a chemical element with symbol As and atomic number 33. Arsenic occurs in many minerals, usually in conjunction with sulfur and metals, and also as a pure elemental crystal. Arsenic is a metalloid.',
    symbol: 'As',
  },
  {
    position: 34,
    name: 'Selenium',
    weight: 78.9718,
    description:
      'Selenium is a chemical element with symbol Se and atomic number 34. It is a nonmetal with properties that are intermediate between those of its periodic table column-adjacent chalcogen elements sulfur and tellurium. It rarely occurs in its elemental state in nature, or as pure ore compounds.',
    symbol: 'Se',
  },
  {
    position: 35,
    name: 'Bromine',
    weight: 79.904,
    description:
      'Bromine (from Ancient Greek:βρῶμος, brómos, meaning "stench") is a chemical element with symbol Br, and atomic number 35. It is a halogen. The element was isolated independently by two chemists, Carl Jacob Löwig and Antoine Jerome Balard, in 1825–1826.',
    symbol: 'Br',
  },
  {
    position: 36,
    name: 'Krypton',
    weight: 83.7982,
    description:
      'Krypton (from Greek:κρυπτός kryptos "the hidden one") is a chemical element with symbol Kr and atomic number 36. It is a member of group 18 (noble gases) elements. A colorless, odorless, tasteless noble gas, krypton occurs in trace amounts in the atmosphere, is isolated by fractionally distilling liquefied air, and is often used with other rare gases in fluorescent lamps.',
    symbol: 'Kr',
  },
  {
    position: 37,
    name: 'Rubidium',
    weight: 85.46783,
    description:
      'Rubidium is a chemical element with symbol Rb and atomic number 37. Rubidium is a soft, silvery-white metallic element of the alkali metal group, with an atomic mass of 85.4678. Elemental rubidium is highly reactive, with properties similar to those of other alkali metals, such as very rapid oxidation in air.',
    symbol: 'Rb',
  },
  {
    position: 38,
    name: 'Strontium',
    weight: 87.621,
    description:
      'Strontium is a chemical element with symbol Sr and atomic number 38. An alkaline earth metal, strontium is a soft silver-white or yellowish metallic element that is highly reactive chemically. The metal turns yellow when it is exposed to air.',
    symbol: 'Sr',
  },
  {
    position: 39,
    name: 'Yttrium',
    weight: 88.905842,
    description:
      'Yttrium is a chemical element with symbol Y and atomic number 39. It is a silvery-metallic transition metal chemically similar to the lanthanides and it has often been classified as a "rare earth element". Yttrium is almost always found combined with the lanthanides in rare earth minerals and is never found in nature as a free element.',
    symbol: 'Y',
  },
  {
    position: 40,
    name: 'Zirconium',
    weight: 91.2242,
    description:
      'Zirconium is a chemical element with symbol Zr and atomic number 40. The name of zirconium is taken from the name of the mineral zircon, the most important source of zirconium. The word zircon comes from the Persian word zargun زرگون, meaning "gold-colored".',
    symbol: 'Zr',
  },
  {
    position: 41,
    name: 'Niobium',
    weight: 92.906372,
    description:
      'Niobium, formerly columbium, is a chemical element with symbol Nb (formerly Cb) and atomic number 41. It is a soft, grey, ductile transition metal, which is often found in the pyrochlore mineral, the main commercial source for niobium, and columbite. The name comes from Greek mythology:Niobe, daughter of Tantalus since it is so similar to tantalum.',
    symbol: 'Nb',
  },
  {
    position: 42,
    name: 'Molybdenum',
    weight: 95.951,
    description:
      'Molybdenum is a chemical element with symbol Mo and atomic number 42. The name is from Neo-Latin molybdaenum, from Ancient Greek Μόλυβδος molybdos, meaning lead, since its ores were confused with lead ores. Molybdenum minerals have been known throughout history, but the element was discovered (in the sense of differentiating it as a new entity from the mineral salts of other metals) in 1778 by Carl Wilhelm Scheele.',
    symbol: 'Mo',
  },
  {
    position: 43,
    name: 'Technetium',
    weight: 98,
    description:
      'Technetium (/tɛkˈniːʃiəm/) is a chemical element with symbol Tc and atomic number 43. It is the element with the lowest atomic number in the periodic table that has no stable isotopes:every form of it is radioactive. Nearly all technetium is produced synthetically, and only minute amounts are found in nature.',
    symbol: 'Tc',
  },
  {
    position: 44,
    name: 'Ruthenium',
    weight: 101.072,
    description:
      'Ruthenium is a chemical element with symbol Ru and atomic number 44. It is a rare transition metal belonging to the platinum group of the periodic table. Like the other metals of the platinum group, ruthenium is inert to most other chemicals.',
    symbol: 'Ru',
  },
  {
    position: 45,
    name: 'Rhodium',
    weight: 102.905502,
    description:
      'Rhodium is a chemical element with symbol Rh and atomic number 45. It is a rare, silvery-white, hard, and chemically inert transition metal. It is a member of the platinum group.',
    symbol: 'Rh',
  },
  {
    position: 46,
    name: 'Palladium',
    weight: 106.421,
    description:
      'Palladium is a chemical element with symbol Pd and atomic number 46. It is a rare and lustrous silvery-white metal discovered in 1803 by William Hyde Wollaston. He named it after the asteroid Pallas, which was itself named after the epithet of the Greek goddess Athena, acquired by her when she slew Pallas.',
    symbol: 'Pd',
  },
  {
    position: 47,
    name: 'Silver',
    weight: 107.86822,
    description:
      'Silver is a chemical element with symbol Ag (Greek:άργυρος árguros, Latin:argentum, both from the Indo-European root *h₂erǵ- for "grey" or "shining") and atomic number 47. A soft, white, lustrous transition metal, it possesses the highest electrical conductivity, thermal conductivity and reflectivity of any metal. The metal occurs naturally in its pure, free form (native silver), as an alloy with gold and other metals, and in minerals such as argentite and chlorargyrite.',
    symbol: 'Ag',
  },
  {
    position: 48,
    name: 'Cadmium',
    weight: 112.4144,
    description:
      'Cadmium is a chemical element with symbol Cd and atomic number 48. This soft, bluish-white metal is chemically similar to the two other stable metals in group 12, zinc and mercury. Like zinc, it prefers oxidation state +2 in most of its compounds and like mercury it shows a low melting point compared to transition metals.',
    symbol: 'Cd',
  },
  {
    position: 49,
    name: 'Indium',
    weight: 114.8181,
    description:
      "Indium is a chemical element with symbol In and atomic number 49. It is a post-transition metallic element that is rare in Earth's crust. The metal is very soft, malleable and easily fusible, with a melting point higher than sodium, but lower than lithium or tin.",
    symbol: 'In',
  },
  {
    position: 50,
    name: 'Tin',
    weight: 118.7107,
    description:
      'Tin is a chemical element with the symbol Sn (for Latin:stannum) and atomic number 50. It is a main group metal in group 14 of the periodic table. Tin shows a chemical similarity to both neighboring group-14 elements, germanium and lead, and has two possible oxidation states, +2 and the slightly more stable +4.',
    symbol: 'Sn',
  },
  {
    position: 51,
    name: 'Antimony',
    weight: 121.7601,
    description:
      'Antimony is a chemical element with symbol Sb (from Latin:stibium) and atomic number 51. A lustrous gray metalloid, it is found in nature mainly as the sulfide mineral stibnite (Sb2S3). Antimony compounds have been known since ancient times and were used for cosmetics; metallic antimony was also known, but it was erroneously identified as lead upon its discovery.',
    symbol: 'Sb',
  },
  {
    position: 52,
    name: 'Tellurium',
    weight: 127.603,
    description:
      'Tellurium is a chemical element with symbol Te and atomic number 52. It is a brittle, mildly toxic, rare, silver-white metalloid. Tellurium is chemically related to selenium and sulfur.',
    symbol: 'Te',
  },
  {
    position: 53,
    name: 'Iodine',
    weight: 126.904473,
    description:
      'Iodine is a chemical element with symbol I and atomic number 53. The name is from Greek ἰοειδής ioeidēs, meaning violet or purple, due to the color of iodine vapor. Iodine and its compounds are primarily used in nutrition, and industrially in the production of acetic acid and certain polymers.',
    symbol: 'I',
  },
  {
    position: 54,
    name: 'Xenon',
    weight: 131.2936,
    description:
      "Xenon is a chemical element with symbol Xe and atomic number 54. It is a colorless, dense, odorless noble gas, that occurs in the Earth's atmosphere in trace amounts. Although generally unreactive, xenon can undergo a few chemical reactions such as the formation of xenon hexafluoroplatinate, the first noble gas compound to be synthesized.",
    symbol: 'Xe',
  },
  {
    position: 55,
    name: 'Cesium',
    weight: 132.905451966,
    description:
      'Caesium or cesium is a chemical element with symbol Cs and atomic number 55. It is a soft, silvery-gold alkali metal with a melting point of 28 °C (82 °F), which makes it one of only five elemental metals that are liquid at or near room temperature. Caesium is an alkali metal and has physical and chemical properties similar to those of rubidium and potassium.',
    symbol: 'Cs',
  },
  {
    position: 56,
    name: 'Barium',
    weight: 137.3277,
    description:
      'Barium is a chemical element with symbol Ba and atomic number 56. It is the fifth element in Group 2, a soft silvery metallic alkaline earth metal. Because of its high chemical reactivity barium is never found in nature as a free element.',
    symbol: 'Ba',
  },
  {
    position: 57,
    name: 'Lanthanum',
    weight: 138.905477,
    description:
      'Lanthanum is a soft, ductile, silvery-white metallic chemical element with symbol La and atomic number 57. It tarnishes rapidly when exposed to air and is soft enough to be cut with a knife. It gave its name to the lanthanide series, a group of 15 similar elements between lanthanum and lutetium in the periodic table:it is also sometimes considered the first element of the 6th-period transition metals.',
    symbol: 'La',
  },
  {
    position: 58,
    name: 'Cerium',
    weight: 140.1161,
    description:
      'Cerium is a chemical element with symbol Ce and atomic number 58. It is a soft, silvery, ductile metal which easily oxidizes in air. Cerium was named after the dwarf planet Ceres (itself named after the Roman goddess of agriculture).',
    symbol: 'Ce',
  },
  {
    position: 59,
    name: 'Praseodymium',
    weight: 140.907662,
    description:
      'Praseodymium is a chemical element with symbol Pr and atomic number 59. Praseodymium is a soft, silvery, malleable and ductile metal in the lanthanide group. It is valued for its magnetic, electrical, chemical, and optical properties.',
    symbol: 'Pr',
  },
  {
    position: 60,
    name: 'Neodymium',
    weight: 144.2423,
    description:
      'Neodymium is a chemical element with symbol Nd and atomic number 60. It is a soft silvery metal that tarnishes in air. Neodymium was discovered in 1885 by the Austrian chemist Carl Auer von Welsbach.',
    symbol: 'Nd',
  },
  {
    position: 61,
    name: 'Promethium',
    weight: 145,
    description:
      'Promethium, originally prometheum, is a chemical element with the symbol Pm and atomic number 61. All of its isotopes are radioactive; it is one of only two such elements that are followed in the periodic table by elements with stable forms, a distinction shared with technetium. Chemically, promethium is a lanthanide, which forms salts when combined with other elements.',
    symbol: 'Pm',
  },
  {
    position: 62,
    name: 'Samarium',
    weight: 150.362,
    description:
      'Samarium is a chemical element with symbol Sm and atomic number 62. It is a moderately hard silvery metal that readily oxidizes in air. Being a typical member of the lanthanide series, samarium usually assumes the oxidation state +3.',
    symbol: 'Sm',
  },
  {
    position: 63,
    name: 'Europium',
    weight: 151.9641,
    description:
      'Europium is a chemical element with symbol Eu and atomic number 63. It was isolated in 1901 and is named after the continent of Europe. It is a moderately hard, silvery metal which readily oxidizes in air and water.',
    symbol: 'Eu',
  },
  {
    position: 64,
    name: 'Gadolinium',
    weight: 157.253,
    description:
      'Gadolinium is a chemical element with symbol Gd and atomic number 64. It is a silvery-white, malleable and ductile rare-earth metal. It is found in nature only in combined (salt) form.',
    symbol: 'Gd',
  },
  {
    position: 65,
    name: 'Terbium',
    weight: 158.925352,
    description:
      'Terbium is a chemical element with symbol Tb and atomic number 65. It is a silvery-white rare earth metal that is malleable, ductile and soft enough to be cut with a knife. Terbium is never found in nature as a free element, but it is contained in many minerals, including cerite, gadolinite, monazite, xenotime and euxenite.',
    symbol: 'Tb',
  },
  {
    position: 66,
    name: 'Dysprosium',
    weight: 162.5001,
    description:
      'Dysprosium is a chemical element with the symbol Dy and atomic number 66. It is a rare earth element with a metallic silver luster. Dysprosium is never found in nature as a free element, though it is found in various minerals, such as xenotime.',
    symbol: 'Dy',
  },
  {
    position: 67,
    name: 'Holmium',
    weight: 164.930332,
    description:
      'Holmium is a chemical element with symbol Ho and atomic number 67. Part of the lanthanide series, holmium is a rare earth element. Holmium was discovered by Swedish chemist Per Theodor Cleve.',
    symbol: 'Ho',
  },
  {
    position: 68,
    name: 'Erbium',
    weight: 167.2593,
    description:
      'Erbium is a chemical element in the lanthanide series, with symbol Er and atomic number 68. A silvery-white solid metal when artificially isolated, natural erbium is always found in chemical combination with other elements on Earth. As such, it is a rare earth element which is associated with several other rare elements in the mineral gadolinite from Ytterby in Sweden, where yttrium, ytterbium, and terbium were discovered.',
    symbol: 'Er',
  },
  {
    position: 69,
    name: 'Thulium',
    weight: 168.934222,
    description:
      'Thulium is a chemical element with symbol Tm and atomic number 69. It is the thirteenth and antepenultimate (third-last) element in the lanthanide series. Like the other lanthanides, the most common oxidation state is +3, seen in its oxide, halides and other compounds.',
    symbol: 'Tm',
  },
  {
    position: 70,
    name: 'Ytterbium',
    weight: 173.0451,
    description:
      'Ytterbium is a chemical element with symbol Yb and atomic number 70. It is the fourteenth and penultimate element in the lanthanide series, which is the basis of the relative stability of its +2 oxidation state. However, like the other lanthanides, its most common oxidation state is +3, seen in its oxide, halides and other compounds.',
    symbol: 'Yb',
  },
  {
    position: 71,
    name: 'Lutetium',
    weight: 174.96681,
    description:
      'Lutetium is a chemical element with symbol Lu and atomic number 71. It is a silvery white metal, which resists corrosion in dry, but not in moist air. It is considered the first element of the 6th-period transition metals and the last element in the lanthanide series, and is traditionally counted among the rare earths.',
    symbol: 'Lu',
  },
  {
    position: 72,
    name: 'Hafnium',
    weight: 178.492,
    description:
      'Hafnium is a chemical element with symbol Hf and atomic number 72. A lustrous, silvery gray, tetravalent transition metal, hafnium chemically resembles zirconium and is found in zirconium minerals. Its existence was predicted by Dmitri Mendeleev in 1869, though it was not identified until 1923, making it the penultimate stable element to be discovered (rhenium was identified two years later).',
    symbol: 'Hf',
  },
  {
    position: 73,
    name: 'Tantalum',
    weight: 180.947882,
    description:
      'Tantalum is a chemical element with symbol Ta and atomic number 73. Previously known as tantalium, its name comes from Tantalus, an antihero from Greek mythology. Tantalum is a rare, hard, blue-gray, lustrous transition metal that is highly corrosion-resistant.',
    symbol: 'Ta',
  },
  {
    position: 74,
    name: 'Tungsten',
    weight: 183.841,
    description:
      'Tungsten, also known as wolfram, is a chemical element with symbol W and atomic number 74. The word tungsten comes from the Swedish language tung sten, which directly translates to heavy stone. Its name in Swedish is volfram, however, in order to distinguish it from scheelite, which in Swedish is alternatively named tungsten.',
    symbol: 'W',
  },
  {
    position: 75,
    name: 'Rhenium',
    weight: 186.2071,
    description:
      "Rhenium is a chemical element with symbol Re and atomic number 75. It is a silvery-white, heavy, third-row transition metal in group 7 of the periodic table. With an estimated average concentration of 1 part per billion (ppb), rhenium is one of the rarest elements in the Earth's crust.",
    symbol: 'Re',
  },
  {
    position: 76,
    name: 'Osmium',
    weight: 190.233,
    description:
      'Osmium (from Greek osme (ὀσμή) meaning "smell") is a chemical element with symbol Os and atomic number 76. It is a hard, brittle, bluish-white transition metal in the platinum group that is found as a trace element in alloys, mostly in platinum ores. Osmium is the densest naturally occurring element, with a density of 22.59 g/cm3.',
    symbol: 'Os',
  },
  {
    position: 77,
    name: 'Iridium',
    weight: 192.2173,
    description:
      'Iridium is a chemical element with symbol Ir and atomic number 77. A very hard, brittle, silvery-white transition metal of the platinum group, iridium is generally credited with being the second densest element (after osmium) based on measured density, although calculations involving the space lattices of the elements show that iridium is denser. It is also the most corrosion-resistant metal, even at temperatures as high as 2000 °C. Although only certain molten salts and halogens are corrosive to solid iridium, finely divided iridium dust is much more reactive and can be flammable.',
    symbol: 'Ir',
  },
  {
    position: 78,
    name: 'Platinum',
    weight: 195.0849,
    description:
      'Platinum is a chemical element with symbol Pt and atomic number 78. It is a dense, malleable, ductile, highly unreactive, precious, gray-white transition metal. Its name is derived from the Spanish term platina, which is literally translated into "little silver".',
    symbol: 'Pt',
  },
  {
    position: 79,
    name: 'Gold',
    weight: 196.9665695,
    description:
      'Gold is a chemical element with symbol Au (from Latin:aurum) and atomic number 79. In its purest form, it is a bright, slightly reddish yellow, dense, soft, malleable and ductile metal. Chemically, gold is a transition metal and a group 11 element.',
    symbol: 'Au',
  },
  {
    position: 80,
    name: 'Mercury',
    weight: 200.5923,
    description:
      'Mercury is a chemical element with symbol Hg and atomic number 80. It is commonly known as quicksilver and was formerly named hydrargyrum (/haɪˈdrɑːrdʒərəm/). A heavy, silvery d-block element, mercury is the only metallic element that is liquid at standard conditions for temperature and pressure; the only other element that is liquid under these conditions is bromine, though metals such as caesium, gallium, and rubidium melt just above room temperature.',
    symbol: 'Hg',
  },
  {
    position: 81,
    name: 'Thallium',
    weight: 204.38,
    description:
      'Thallium is a chemical element with symbol Tl and atomic number 81. This soft gray post-transition metal is not found free in nature. When isolated, it resembles tin, but discolors when exposed to air.',
    symbol: 'Tl',
  },
  {
    position: 82,
    name: 'Lead',
    weight: 207.21,
    description:
      'Lead (/lɛd/) is a chemical element in the carbon group with symbol Pb (from Latin:plumbum) and atomic number 82. Lead is a soft, malleable and heavy post-transition metal. Metallic lead has a bluish-white color after being freshly cut, but it soon tarnishes to a dull grayish color when exposed to air.',
    symbol: 'Pb',
  },
  {
    position: 83,
    name: 'Bismuth',
    weight: 208.980401,
    description:
      'Bismuth is a chemical element with symbol Bi and atomic number 83. Bismuth, a pentavalent post-transition metal, chemically resembles arsenic and antimony. Elemental bismuth may occur naturally, although its sulfide and oxide form important commercial ores.',
    symbol: 'Bi',
  },
  {
    position: 84,
    name: 'Polonium',
    weight: 209,
    description:
      'Polonium is a chemical element with symbol Po and atomic number 84, discovered in 1898 by Marie Curie and Pierre Curie. A rare and highly radioactive element with no stable isotopes, polonium is chemically similar to bismuth and tellurium, and it occurs in uranium ores. Applications of polonium are few.',
    symbol: 'Po',
  },
  {
    position: 85,
    name: 'Astatine',
    weight: 210,
    description:
      'Astatine is a very rare radioactive chemical element with the chemical symbol At and atomic number 85. It occurs on Earth as the decay product of various heavier elements. All its isotopes are short-lived; the most stable is astatine-210, with a half-life of 8.1 hours.',
    symbol: 'At',
  },
  {
    position: 86,
    name: 'Radon',
    weight: 222,
    description:
      'Radon is a chemical element with symbol Rn and atomic number 86. It is a radioactive, colorless, odorless, tasteless noble gas, occurring naturally as a decay product of radium. Its most stable isotope, 222Rn, has a half-life of 3.8 days.',
    symbol: 'Rn',
  },
  {
    position: 87,
    name: 'Francium',
    weight: 223,
    description:
      'Francium is a chemical element with symbol Fr and atomic number 87. It used to be known as eka-caesium and actinium K. It is the second-least electronegative element, behind only caesium. Francium is a highly radioactive metal that decays into astatine, radium, and radon.',
    symbol: 'Fr',
  },
  {
    position: 88,
    name: 'Radium',
    weight: 226,
    description:
      'Radium is a chemical element with symbol Ra and atomic number 88. It is the sixth element in group 2 of the periodic table, also known as the alkaline earth metals. Pure radium is almost colorless, but it readily combines with nitrogen (rather than oxygen) on exposure to air, forming a black surface layer of radium nitride (Ra3N2).',
    symbol: 'Ra',
  },
  {
    position: 89,
    name: 'Actinium',
    weight: 227,
    description:
      'Actinium is a radioactive chemical element with symbol Ac (not to be confused with the abbreviation for an acetyl group) and atomic number 89, which was discovered in 1899. It was the first non-primordial radioactive element to be isolated. Polonium, radium and radon were observed before actinium, but they were not isolated until 1902.',
    symbol: 'Ac',
  },
  {
    position: 90,
    name: 'Thorium',
    weight: 232.03774,
    description:
      'Thorium is a chemical element with symbol Th and atomic number 90. A radioactive actinide metal, thorium is one of only two significantly radioactive elements that still occur naturally in large quantities as a primordial element (the other being uranium). It was discovered in 1828 by the Norwegian Reverend and amateur mineralogist Morten Thrane Esmark and identified by the Swedish chemist Jöns Jakob Berzelius, who named it after Thor, the Norse god of thunder.',
    symbol: 'Th',
  },
  {
    position: 91,
    name: 'Protactinium',
    weight: 231.035882,
    description:
      'Protactinium is a chemical element with symbol Pa and atomic number 91. It is a dense, silvery-gray metal which readily reacts with oxygen, water vapor and inorganic acids. It forms various chemical compounds where protactinium is usually present in the oxidation state +5, but can also assume +4 and even +2 or +3 states.',
    symbol: 'Pa',
  },
  {
    position: 92,
    name: 'Uranium',
    weight: 238.028913,
    description:
      'Uranium is a chemical element with symbol U and atomic number 92. It is a silvery-white metal in the actinide series of the periodic table. A uranium atom has 92 protons and 92 electrons, of which 6 are valence electrons.',
    symbol: 'U',
  },
  {
    position: 93,
    name: 'Neptunium',
    weight: 237,
    description:
      'Neptunium is a chemical element with symbol Np and atomic number 93. A radioactive actinide metal, neptunium is the first transuranic element. Its position in the periodic table just after uranium, named after the planet Uranus, led to it being named after Neptune, the next planet beyond Uranus.',
    symbol: 'Np',
  },
  {
    position: 94,
    name: 'Plutonium',
    weight: 244,
    description:
      'Plutonium is a transuranic radioactive chemical element with symbol Pu and atomic number 94. It is an actinide metal of silvery-gray appearance that tarnishes when exposed to air, and forms a dull coating when oxidized. The element normally exhibits six allotropes and four oxidation states.',
    symbol: 'Pu',
  },
  {
    position: 95,
    name: 'Americium',
    weight: 243,
    description:
      'Americium is a radioactive transuranic chemical element with symbol Am and atomic number 95. This member of the actinide series is located in the periodic table under the lanthanide element europium, and thus by analogy was named after the Americas. Americium was first produced in 1944 by the group of Glenn T.Seaborg from Berkeley, California, at the metallurgical laboratory of University of Chicago.',
    symbol: 'Am',
  },
  {
    position: 96,
    name: 'Curium',
    weight: 247,
    description:
      'Curium is a transuranic radioactive chemical element with symbol Cm and atomic number 96. This element of the actinide series was named after Marie and Pierre Curie – both were known for their research on radioactivity. Curium was first intentionally produced and identified in July 1944 by the group of Glenn T. Seaborg at the University of California, Berkeley.',
    symbol: 'Cm',
  },
  {
    position: 97,
    name: 'Berkelium',
    weight: 247,
    description:
      'Berkelium is a transuranic radioactive chemical element with symbol Bk and atomic number 97. It is a member of the actinide and transuranium element series. It is named after the city of Berkeley, California, the location of the University of California Radiation Laboratory where it was discovered in December 1949.',
    symbol: 'Bk',
  },
  {
    position: 98,
    name: 'Californium',
    weight: 251,
    description:
      'Californium is a radioactive metallic chemical element with symbol Cf and atomic number 98. The element was first made in 1950 at the University of California Radiation Laboratory in Berkeley, by bombarding curium with alpha particles (helium-4 ions). It is an actinide element, the sixth transuranium element to be synthesized, and has the second-highest atomic mass of all the elements that have been produced in amounts large enough to see with the unaided eye (after einsteinium).',
    symbol: 'Cf',
  },
  {
    position: 99,
    name: 'Einsteinium',
    weight: 252,
    description:
      'Einsteinium is a synthetic element with symbol Es and atomic number 99. It is the seventh transuranic element, and an actinide. Einsteinium was discovered as a component of the debris of the first hydrogen bomb explosion in 1952, and named after Albert Einstein.',
    symbol: 'Es',
  },
  {
    position: 100,
    name: 'Fermium',
    weight: 257,
    description:
      'Fermium is a synthetic element with symbol Fm and atomic number 100. It is a member of the actinide series. It is the heaviest element that can be formed by neutron bombardment of lighter elements, and hence the last element that can be prepared in macroscopic quantities, although pure fermium metal has not yet been prepared.',
    symbol: 'Fm',
  },
  {
    position: 101,
    name: 'Mendelevium',
    weight: 258,
    description:
      'Mendelevium is a synthetic element with chemical symbol Md (formerly Mv) and atomic number 101. A metallic radioactive transuranic element in the actinide series, it is the first element that currently cannot be produced in macroscopic quantities through neutron bombardment of lighter elements. It is the antepenultimate actinide and the ninth transuranic element.',
    symbol: 'Md',
  },
  {
    position: 102,
    name: 'Nobelium',
    weight: 259,
    description:
      'Nobelium is a synthetic chemical element with symbol No and atomic number 102. It is named in honor of Alfred Nobel, the inventor of dynamite and benefactor of science. A radioactive metal, it is the tenth transuranic element and is the penultimate member of the actinide series.',
    symbol: 'No',
  },
  {
    position: 103,
    name: 'Lawrencium',
    weight: 266,
    description:
      'Lawrencium is a synthetic chemical element with chemical symbol Lr (formerly Lw) and atomic number 103. It is named in honor of Ernest Lawrence, inventor of the cyclotron, a device that was used to discover many artificial radioactive elements. A radioactive metal, lawrencium is the eleventh transuranic element and is also the final member of the actinide series.',
    symbol: 'Lr',
  },
  {
    position: 104,
    name: 'Rutherfordium',
    weight: 267,
    description:
      'Rutherfordium is a chemical element with symbol Rf and atomic number 104, named in honor of physicist Ernest Rutherford. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and radioactive; the most stable known isotope, 267Rf, has a half-life of approximately 1.3 hours. In the periodic table of the elements, it is a d - block element and the second of the fourth - row transition elements.',
    symbol: 'Rf',
  },
  {
    position: 105,
    name: 'Dubnium',
    weight: 268,
    description:
      'Dubnium is a chemical element with symbol Db and atomic number 105. It is named after the town of Dubna in Russia (north of Moscow), where it was first produced. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and radioactive; the most stable known isotope, dubnium-268, has a half-life of approximately 28 hours.',
    symbol: 'Db',
  },
  {
    position: 106,
    name: 'Seaborgium',
    weight: 269,
    description:
      'Seaborgium is a synthetic element with symbol Sg and atomic number 106. Its most stable isotope 271Sg has a half-life of 1.9 minutes. A more recently discovered isotope 269Sg has a potentially slightly longer half-life (ca.',
    symbol: 'Sg',
  },
  {
    position: 107,
    name: 'Bohrium',
    weight: 270,
    description:
      'Bohrium is a chemical element with symbol Bh and atomic number 107. It is named after Danish physicist Niels Bohr. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and radioactive; the most stable known isotope, 270Bh, has a half-life of approximately 61 seconds.',
    symbol: 'Bh',
  },
  {
    position: 108,
    name: 'Hassium',
    weight: 269,
    description:
      'Hassium is a chemical element with symbol Hs and atomic number 108, named after the German state of Hesse. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and radioactive; the most stable known isotope, 269Hs, has a half-life of approximately 9.7 seconds, although an unconfirmed metastable state, 277mHs, may have a longer half-life of about 130 seconds. More than 100 atoms of hassium have been synthesized to date.',
    symbol: 'Hs',
  },
  {
    position: 109,
    name: 'Meitnerium',
    weight: 278,
    description:
      'Meitnerium is a chemical element with symbol Mt and atomic number 109. It is an extremely radioactive synthetic element (an element not found in nature that can be created in a laboratory). The most stable known isotope, meitnerium-278, has a half-life of 7.6 seconds.',
    symbol: 'Mt',
  },
  {
    position: 110,
    name: 'Darmstadtium',
    weight: 281,
    description:
      'Darmstadtium is a chemical element with symbol Ds and atomic number 110. It is an extremely radioactive synthetic element. The most stable known isotope, darmstadtium-281, has a half-life of approximately 10 seconds.',
    symbol: 'Ds',
  },
  {
    position: 111,
    name: 'Roentgenium',
    weight: 282,
    description:
      'Roentgenium is a chemical element with symbol Rg and atomic number 111. It is an extremely radioactive synthetic element (an element that can be created in a laboratory but is not found in nature); the most stable known isotope, roentgenium-282, has a half-life of 2.1 minutes. Roentgenium was first created in 1994 by the GSI Helmholtz Centre for Heavy Ion Research near Darmstadt, Germany.',
    symbol: 'Rg',
  },
  {
    position: 112,
    name: 'Copernicium',
    weight: 285,
    description:
      'Copernicium is a chemical element with symbol Cn and atomic number 112. It is an extremely radioactive synthetic element that can only be created in a laboratory. The most stable known isotope, copernicium-285, has a half-life of approximately 29 seconds, but it is possible that this copernicium isotope may have a nuclear isomer with a longer half-life, 8.9 min.',
    symbol: 'Cn',
  },
  {
    position: 113,
    name: 'Nihonium',
    weight: 286,
    description:
      'Nihonium is a chemical element with atomic number 113. It has a symbol Nh. It is a synthetic element (an element that can be created in a laboratory but is not found in nature) and is extremely radioactive; its most stable known isotope, nihonium-286, has a half-life of 20 seconds.',
    symbol: 'Nh',
  },
  {
    position: 114,
    name: 'Flerovium',
    weight: 289,
    description:
      'Flerovium is a superheavy artificial chemical element with symbol Fl and atomic number 114. It is an extremely radioactive synthetic element. The element is named after the Flerov Laboratory of Nuclear Reactions of the Joint Institute for Nuclear Research in Dubna, Russia, where the element was discovered in 1998.',
    symbol: 'Fl',
  },
  {
    position: 115,
    name: 'Moscovium',
    weight: 289,
    description:
      'Moscovium is the name of a synthetic superheavy element in the periodic table that has the symbol Mc and has the atomic number 115. It is an extremely radioactive element; its most stable known isotope, moscovium-289, has a half-life of only 220 milliseconds. It is also known as eka-bismuth or simply element 115.',
    symbol: 'Mc',
  },
  {
    position: 116,
    name: 'Livermorium',
    weight: 293,
    description:
      'Livermorium is a synthetic superheavy element with symbol Lv and atomic number 116. It is an extremely radioactive element that has only been created in the laboratory and has not been observed in nature. The element is named after the Lawrence Livermore National Laboratory in the United States, which collaborated with the Joint Institute for Nuclear Research in Dubna, Russia to discover livermorium in 2000.',
    symbol: 'Lv',
  },
  {
    position: 117,
    name: 'Tennessine',
    weight: 294,
    description:
      'Tennessine is a superheavy artificial chemical element with an atomic number of 117 and a symbol of Ts. Also known as eka-astatine or element 117, it is the second-heaviest known element and penultimate element of the 7th period of the periodic table. As of 2016, fifteen tennessine atoms have been observed: six when it was first synthesized in 2010, seven in 2012, and two in 2014.',
    symbol: 'Ts',
  },
  {
    position: 118,
    name: 'Oganesson',
    weight: 294,
    description:
      "Oganesson is IUPAC's name for the transactinide element with the atomic number 118 and element symbol Og. It is also known as eka-radon or element 118, and on the periodic table of the elements it is a p-block element and the last one of the 7th period. Oganesson is currently the only synthetic member of group 18.",
    symbol: 'Og',
  },
  {
    position: 119,
    name: 'Ununennium',
    weight: 315,
    description:
      'Ununennium, also known as eka-francium or simply element 119, is the hypothetical chemical element with symbol Uue and atomic number 119. Ununennium and Uue are the temporary systematic IUPAC name and symbol respectively, until a permanent name is decided upon. In the periodic table of the elements, it is expected to be an s-block element, an alkali metal, and the first element in the eighth period.',
    symbol: 'Uue',
  },
];

@Injectable({
  providedIn: 'root',
})
export class PeriodicElementService {
  constructor() {}

  public getStandardData(): PeriodicElement[] {
    return ELEMENT_DATA;
  }

  /** Pour simuler le renvoi d'un endPoint d'api... */
  public observableStandarData(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA);
  }
}
