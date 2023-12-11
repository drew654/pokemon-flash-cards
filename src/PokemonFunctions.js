export const parseName = name => {
  const parsedName = {};
  const originalName = name;

  const hyphenatedNames = ['ho-oh', 'porygon-z', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu', 'red-striped', 'blue-striped', 'white-striped', 'ash-greninja'];
  const otherHyphenatedNames = ['jangmo-o', 'hakamo-o', 'kommo-o'];
  const formes = ['deoxys', 'giratina', 'shaymin', 'tornadus', 'thundurus', 'landorus', 'meloetta', 'aegislash', 'zygarde', 'enamorus', 'dialga', 'palkia'];
  const forms = ['basculin', 'keldeo', 'lycanroc', 'minior', 'mimikyu', 'toxtricity', 'castform', 'wishiwashi', 'cramorant'];
  const styles = ['oricorio', 'urshifu'];
  const modes = ['darmanitan', 'morpeko'];
  const colors = ['kyurem'];
  const abilities = ['battle-bond', 'own-tempo'];
  const otherForms = ['dada'];

  const simpleParse = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const hyphenatedParse = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
  }

  parsedName.print = () => {
    let printName = '';

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

    // Rotom
    if (parsedName?.rotom) {
      printName = parsedName.rotom + ' ' + printName;
    }

    // Color
    if (parsedName?.color) {
      printName = parsedName.color + ' ' + printName;
    }

    // Region
    if (parsedName?.region) {
      printName = parsedName.region + ' ' + printName;
    }

    // Totem
    if (parsedName?.totem) {
      printName += ' (Totem)';
    }

    // Ability
    if (parsedName?.ability) {
      printName += ' (' + parsedName.ability + ')';
    }

    // Other forms
    if (parsedName?.otherForm) {
      printName += ' (' + parsedName.otherForm + ')';
    }

    // Hyphenated
    const foundHyphenatedName = hyphenatedNames.find(hyphenatedName => originalName.includes(hyphenatedName));
    if (foundHyphenatedName) {
      printName = printName.replace(simpleParse(foundHyphenatedName), hyphenatedParse(foundHyphenatedName));
    }
    const foundOtherHyphenatedName = otherHyphenatedNames.find(hyphenatedName => originalName.includes(hyphenatedName));
    if (foundOtherHyphenatedName) {
      console.log(foundOtherHyphenatedName, printName);
        printName = printName.replace(' ', '-');
        printName = printName.replace(/-(.)/g, function(match, p1) {
          return '-' + p1.toLowerCase();
        });
      }

    return printName;
  }

  // Special cases
  if (name.includes('nidoran')) {
    if (name[name.length - 1] === 'm') {
      name = 'nidoran♂';
    }
    else {
      name = 'nidoran♀';
    }
  }
  if (name.includes('mr')) {
    name = name.replace('mr', 'mr.');
  }
  if (name.includes('jr')) {
    name = name.replace('jr', 'jr.');
  }
  if (name.includes('wormadam')) {
    parsedName.cloak = name.split('-')[1];
    name = 'wormadam';
  }
  if (name.includes('flabebe')) {
    name = name.replace('flabebe', 'flabébé');
  }
  if (name.includes('zygarde')) {
    name = name.replace('0', '0%');
  }
  if (name.includes('type-null')) {
    name = name.replace('type-null', 'type:-null');
  }
  if (name.includes('rotom')) {
    const splitName = name.split('-');
    name = splitName[0];
    parsedName.rotom = splitName.filter(word => word !== name).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  if (name.includes('floette-eternal')) {
    name = name.replace('floette-eternal', 'floette-(Eternal-flower)');
  }
  if (name.includes('-phd')) {
    name = name.replace('-phd', ', Ph.D');
  }
  if (name.includes('-cosplay')) {
    name = 'cosplay-' + name.replace('-cosplay', '');
  }
  if (name.includes('-cap')) {
    name = name.replace('pikachu-', '') + '-pikachu';
  }
  if (name.includes('-ash')) {
    name = 'ash-' + name.replace('-ash', '');
  }
  if (name.includes('magearna-original')) {
    name = name.replace('magearna-original', 'magearna-(Original Color)');
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
  if (name.includes('-starter')) {
    name = name.replace('-starter', '-(Starter)');
  }
  if (name.includes('zacian') || name.includes('zamazenta')) {
    if (name.includes('-crowned')) {
      name = name.replace('-crowned', ' (Crowned Sword)');
    }
    else {
      name = name + ' (Hero of Many Battles)';
    }
  }
  if (name.includes('eternatus-eternamax')) {
    name = name.replace('eternatus-eternamax', 'eternamax-eternatus');
  }
  if (name.includes('calyrex')) {
    if (name.includes('-ice')) {
      name = name.replace('-ice', ' (Ice Rider)');
    }
    else if (name.includes('-shadow')) {
      name = name.replace('-shadow', ' (Shadow Rider)');
    }
  }

  // Region
  if (name.includes('-alola')) {
    name = name.replace('-alola', '');
    parsedName.region = 'Alolan';
  }
  if (name.includes('-galar')) {
    name = name.replace('-galar', '');
    parsedName.region = 'Galarian';
  }
  if (name.includes('-hisui')) {
    name = name.replace('-hisui', '');
    parsedName.region = 'Hisuian';
  }

  // Totem
  if (name.includes('-totem')) {
    name = name.replace('-totem', '');
    parsedName.totem = true;
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
  if (name.includes('primal')) {
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
    const pokemonWithTheForm = forms.concat(formes).find(form => name.includes(form));
    parsedName.form = name.replace(pokemonWithTheForm + '-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    name = pokemonWithTheForm;
  }

  // Abilities
  let foundAbility = abilities.find(ability => name.includes(ability));
  if (foundAbility) {
    parsedName.ability = foundAbility.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    name = name.replace(foundAbility, '');
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
    parsedName.otherForm = foundOtherForm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    name = name.replace(foundOtherForm, '');
  }
  
  return parsedName.print();
}
