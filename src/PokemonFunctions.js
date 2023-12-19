export const simpleParse = (string) => {
  return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const parseName = name => {
  if (!name) {
    return undefined;
  }
  const parsedName = {};
  const originalName = name;

  const hyphenatedNames = ['ho-oh', 'porygon-z', 'greninja-ash', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu', 'red-striped', 'blue-striped', 'white-striped', 'ash-greninja', 'three-segment'];
  const otherHyphenatedNames = ['jangmo-o', 'hakamo-o', 'kommo-o'];
  const formes = ['deoxys', 'giratina', 'shaymin', 'tornadus', 'thundurus', 'landorus', 'meloetta', 'aegislash', 'zygarde', 'enamorus', 'dialga', 'palkia'];
  const forms = ['basculin', 'keldeo', 'lycanroc', 'minior', 'mimikyu', 'toxtricity', 'castform', 'wishiwashi', 'cramorant', 'dudunsparce', 'palafin', 'tatsugiri', 'gimmighoul'];
  const styles = ['oricorio', 'urshifu'];
  const modes = ['darmanitan', 'morpeko'];
  const colors = ['kyurem'];
  const otherForms = ['plant-cloak', 'sandy-cloak', 'trash-cloak', 'eternal-flower', 'original-color', 'hero-of-many-battles', 'crowned-sword', 'dada', 'starter', 'ice-rider', 'shadow-rider', 'combat-breed', 'blaze-breed', 'aqua-breed', 'family-of-three', 'family-of-four', 'green-plumage', 'blue-plumage', 'yellow-plumage', 'white-plumage', 'limited-build', 'sprinting-build', 'swimming-build', 'gliding-build', 'low-power-mode', 'drive-mode', 'aquatic-mode', 'glide-mode', 'teal-mask', 'wellspring-mask', 'hearthflame-mask', 'cornerstone-mask'];
  const prefixes = ['heat', 'wash', 'frost', 'fan', 'mow', 'cosplay', 'original-cap', 'hoenn-cap', 'sinnoh-cap', 'unova-cap', 'kalos-cap', 'alola-cap', 'partner-cap', 'world-cap', 'battle-bond', 'own-tempo', 'totem', 'bloodmoon'];
  const suffixes = ['rock-star', 'belle', 'pop-star', 'phd', 'libre', 'original-cap', 'hoenn-cap', 'sinnoh-cap', 'unova-cap', 'kalos-cap', 'alola-cap'];

  const hyphenatedParse = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
  }

  const printFullName = () => {
    let printName = parsedName.prefix ? parsedName.prefix + ' ' : '';

    // Mega
    if (parsedName.mega) {
      printName += 'Mega ';
    }

    // Primal
    if (parsedName.primal) {
      printName += 'Primal ';
    }

    // Base name
    const baseName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    if (parsedName.hyphenated) {
      printName += parsedName.hyphenated;
    }
    else {
      printName += baseName;
    }

    // Form
    if (parsedName.form) {
      if (parsedName.formWithAnE) {
        printName += ' (' + parsedName.form + ' Forme)';
      }
      else {
        printName += ' (' + parsedName.form + ' Form)';
      }
    }

    // Cloak
    if (parsedName.cloak) {
      printName += ' (' + parsedName.cloak.charAt(0).toUpperCase() + parsedName.cloak.slice(1) + ' Cloak)';
    }

    // Mega X/Y
    if (parsedName?.mega?.length === 6) {
      printName += ' ' + parsedName.mega.charAt(5);
    }

    // Gigantamax
    if (parsedName.gmax) {
      printName = 'Gigantamax ' + printName;
    }

    // Gender
    if (parsedName?.male) {
      printName += ' (Male)';
    }
    else if (parsedName?.female) {
      printName += ' (Female)';
    }

    // Size
    if (parsedName?.size) {
      printName += ' (' + parsedName.size.charAt(0).toUpperCase() + parsedName.size.slice(1) + ' Size)';
    }

    // Style
    if (parsedName?.style) {
      printName += ' (' + parsedName.style + ' Style)';
    }

    // Face
    if (parsedName?.face) {
      printName += ' (' + parsedName.face.charAt(0).toUpperCase() + parsedName.face.slice(1) + ' Face)';
    }

    // Mode
    if (parsedName?.mode) {
      printName += ' (' + parsedName.mode.charAt(0).toUpperCase() + parsedName.mode.slice(1) + ' Mode)';
    }

    // Color
    if (parsedName?.color) {
      printName = parsedName.color + ' ' + printName;
    }

    // Region
    if (parsedName?.region) {
      printName = parsedName.region + ' ' + printName;
    }

    // Other forms
    if (parsedName?.otherForm) {
      printName += ' (' + parsedName.otherForm + ')';
    }

    // Suffix
    if (parsedName?.suffix) {
      printName += ' ' + parsedName.suffix;
    }

    // Hyphenated
    const foundHyphenatedName = hyphenatedNames.find(hyphenatedName => originalName.includes(hyphenatedName));
    if (foundHyphenatedName) {
      printName = printName.replace(simpleParse(foundHyphenatedName), hyphenatedParse(foundHyphenatedName));
    }
    const foundOtherHyphenatedName = otherHyphenatedNames.find(hyphenatedName => originalName.includes(hyphenatedName));
    if (foundOtherHyphenatedName) {
      printName = printName.replace(' ', '-');
      printName = printName.replace(/-(.)/g, (match, p1) => {
        return '-' + p1.toLowerCase();
      });
    }

    // Other
    if (printName.includes('Of')) {
      printName = printName.replace('Of', 'of');
    }
    if (printName.includes(' Phd')) {
      printName = printName.replace(' Phd', ', Ph.D');
    }

    return printName;
  }

  const printBaseName = () => {
    let printName = '';
    const hyphenName = name.replace(' ', '-').toLowerCase();

    // Primal
    if (parsedName.primal) {
      printName += 'Primal ';
    }

    // Mega
    if (parsedName.mega) {
      printName += 'Mega ';
    }

    printName += simpleParse(name);

    // Mega X/Y
    if (parsedName?.mega?.length === 6) {
      printName += ' ' + parsedName.mega.charAt(5);
    }

    // Gigantamax
    if (parsedName.gmax) {
      printName = 'Gigantamax ' + printName;
    }

    // Hyphenated
    const foundHyphenatedName = hyphenatedNames.find(hyphenatedName => hyphenName.includes(hyphenatedName));
    if (foundHyphenatedName) {
      printName = printName.replace(simpleParse(foundHyphenatedName), hyphenatedParse(foundHyphenatedName));
    }
    const foundOtherHyphenatedName = otherHyphenatedNames.find(hyphenatedName => hyphenName.includes(hyphenatedName));
    if (foundOtherHyphenatedName) {
      printName = printName.replace(' ', '-');
      printName = printName.replace(/-(.)/g, (match, p1) => {
        return '-' + p1.toLowerCase();
      });
    }

    return printName;
  }

  const printPrefix = () => {
    let printName = '';
    printName += parsedName.region ? parsedName.region + ' ' : '';
    printName += parsedName.prefix ? parsedName.prefix + ' ' : '';
    printName += parsedName.color ? parsedName.color + ' ' : '';

    // Other
    if (printName.includes('Of')) {
      printName = printName.replace('Of', 'of');
    }
    if (printName.includes('Phd')) {
      if (printName.includes(' Phd')) {
        printName = printName.replace(' Phd', ', Ph.D');
      }
      else {
        printName = printName.replace('Phd', 'Ph.D');
      }
    }

    return printName;
  }

  const printSuffix = () => {
    let printName = '';
    printName += parsedName.suffix ? parsedName.suffix : '';
    printName += parsedName.otherForm ? ' (' + parsedName.otherForm + ')' : '';
    if (parsedName.form) {
      if (parsedName.formWithAnE) {
        printName += ' (' + parsedName.form + ' Forme)';
      }
      else {
        printName += ' (' + parsedName.form + ' Form)';
      }
    }
    printName += parsedName.size ? ' (' + parsedName.size.charAt(0).toUpperCase() + parsedName.size.slice(1) + ' Size)' : '';
    printName += parsedName.mode ? ' (' + parsedName.mode.charAt(0).toUpperCase() + parsedName.mode.slice(1) + ' Mode)' : '';
    printName += parsedName.style ? ' (' + parsedName.style + ' Style)' : '';
    printName += parsedName.male ? ' (Male)' : '';
    printName += parsedName.female ? ' (Female)' : '';
    
    // Other
    if (printName.includes('Of')) {
      printName = printName.replace('Of', 'of');
    }
    if (printName.includes('Phd')) {
      if (printName.includes(' Phd')) {
        printName = printName.replace(' Phd', ', Ph.D');
      }
      else {
        printName = printName.replace('Phd', 'Ph.D');
      }
    }

    return printName;
  }

  // Special cases
  if (name === 'nidoran') {
    if (name[name.length - 1] === 'm') {
      name = 'nidoran♂';
    }
    else {
      name = 'nidoran♀';
    }
  }
  if (name.includes('farfetchd')) {
    name = name.replace('farfetchd', 'farfetch\'d');
  }
  if (name.includes('mr')) {
    name = name.replace('mr', 'mr.');
  }
  if (name.includes('jr')) {
    name = name.replace('jr', 'jr.');
  }
  if (name === 'castform') {
    name += '-normal';
  }
  if (name.includes('wormadam')) {
    name += '-cloak';
  }
  if (name.includes('flabebe')) {
    name = name.replace('flabebe', 'flabébé');
  }
  if (name.includes('zygarde')) {
    name = name.replace('0', '0%');
  }
  if (name.includes('minior')) {
    if (!name.includes('meteor')) {
      name += '-core';
    }
  }
  if (name.includes('type-null')) {
    name = name.replace('type-null', 'type:-null');
  }
  if (name === 'floette-eternal') {
    name += '-flower';
  }
  if (name.includes('-ash')) {
    name = 'ash-' + name.replace('-ash', '');
  }
  if (name.includes('magearna-original')) {
    name += '-color';
  }
  if (name.includes('necrozma')) {
    if (name === 'necrozma-dusk') {
      name = 'dusk-mane';
    }
    else if (name === 'necrozma-dawn') {
      name = 'dawn-wings';
    }
    else if (name === 'necrozma-ultra') {
      name = 'ultra-necrozma';
    }
  }
  if (name.includes('zacian') || name.includes('zamazenta')) {
    if (name === 'zacian' || name === 'zamazenta') {
      name += '-hero-of-many-battles';
    }
    else {
      name += '-sword';
    }
  }
  if (name.includes('eternatus-eternamax')) {
    name = name.replace('eternatus-eternamax', 'eternamax-eternatus');
  }
  if (name.includes('calyrex')) {
    if (name.includes('-ice')) {
      name = name.replace('-ice', '-ice-rider');
    }
    else if (name.includes('-shadow')) {
      name = name.replace('-shadow', '-shadow-rider');
    }
  }
  if (name === 'palafin') {
    name = 'palafin-zero';
  }
  if (name.includes('maushold')) {
    if (name === 'maushold') {
      name += '-family-of-four';
    }
  }
  if (name === 'tatsugiri') {
    name += '-curly';
  }
  if (name === 'squawkabilly') {
    name += '-green-plumage';
  }
  if (name === 'gimmighoul') {
    name += '-chest';
  }
  if (name === 'ogerpon') {
    name += '-teal-mask';
  }

  // Prefix
  const foundPrefix = prefixes.find(prefix => name.includes('-' + prefix));
  if (foundPrefix) {
    parsedName.prefix = simpleParse(foundPrefix);
    name = name.replace('-' + foundPrefix, '');
  }

  // Suffix
  const foundSuffix = suffixes.find(suffix => name.includes('-' + suffix));
  if (foundSuffix) {
    parsedName.suffix = simpleParse(foundSuffix);
    name = name.replace('-' + foundSuffix, '');
  }

  // Region
  if (name.includes('-alola')) {
    name = name.replace('-alola', '');
    parsedName.region = 'Alolan';
  }
  else if (name.includes('-galar')) {
    name = name.replace('-galar', '');
    parsedName.region = 'Galarian';
  }
  else if (name.includes('-hisui')) {
    name = name.replace('-hisui', '');
    parsedName.region = 'Hisuian';
  }
  else if (name.includes('-paldea')) {
    name = name.replace('-paldea', '');
    parsedName.region = 'Paldean';
  }
    
  // Mega (X/Y)
  if (name.includes('-mega')) {
    if (name.includes('-mega-x')) {
      parsedName.mega = 'Mega X';
      name = name.replace('-mega-x', '');
    }
    else if (name.includes('-mega-y')) {
      parsedName.mega = 'Mega Y';
      name = name.replace('-mega-y', '');
    }
    else {
      parsedName.mega = 'Mega';
      name = name.replace('-mega', '');
    }
  }

  // Primal
  if (name.includes('-primal')) {
    parsedName.primal = true;
    name = name.replace('-primal', '');
  }

  // Gigantamax
  if (name.includes('-gmax')) {
    name = name.replace('-gmax', '');
    parsedName.gmax = true;
  }

  // Formes
  if (formes.some(forme => name.includes(forme))) {
    parsedName.formWithAnE = true;
  }

  // Forms 
  if (forms.concat(formes).some(form => name.includes(form))) {
    if (name.includes('-')) {
      const pokemonWithTheForm = forms.concat(formes).find(form => name.includes(form));
      parsedName.form = name.replace(pokemonWithTheForm + '-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      name = pokemonWithTheForm;
    }
  }

  // Gender
  if (name.includes('-male')) {
    parsedName.male = true;
    name = name.replace('-male', '');
  }
  if (name.includes('-female')) {
    parsedName.female = true;
    name = name.replace('-female', '');
  }

  // Size
  if (name.includes('pumpkaboo')) {
    parsedName.size = name.split('-')[1];
    name = 'pumpkaboo';
  }
  if (name.includes('gourgeist')) {
    parsedName.size = name.split('-')[1];
    name = 'gourgeist';
  }

  // Style
  if (styles.some(style => name.includes(style))) {
    const splitName = name.split('-');
    name = splitName[0];
    const style = splitName.filter(word => word !== name).map(word => word.charAt(0) + word.slice(1)).join('-');
    parsedName.style = style;

    if (name === 'oricorio') {
      if (style === 'pau') {
        parsedName.style = 'Pa\'u';
      }
      else if (style === 'pom-pom') {
        parsedName.style = 'Pom-Pom';
      }
      else {
        parsedName.style = style.charAt(0).toUpperCase() + style.slice(1);
      }
    }
    else if (name === 'urshifu') {
      parsedName.style = style.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
  }

  // Face
  if (name.includes('eiscue')) {
    parsedName.face = name.split('-')[1];
    name = 'eiscue';
  }

  // Mode
  if (modes.some(mode => name.includes(mode))) {
    const splitName = name.split('-');
    name = name.split('-')[0];
    parsedName.mode = splitName.filter(word => word !== name).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Color
  if (colors.some(color => name.includes(color))) {
    const splitName = name.split('-');
    name = splitName[0];
    parsedName.color = splitName.filter(word => word !== name).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Other forms
  const foundOtherForm = otherForms.find(form => name.includes(form));
  if (foundOtherForm) {
    parsedName.otherForm = simpleParse(foundOtherForm);
    name = name.replace(foundOtherForm, '');
  }
  
  return {
    fullName: printFullName(),
    baseName: printBaseName(),
    prefix: printPrefix(),
    suffix: printSuffix()
  }
}
