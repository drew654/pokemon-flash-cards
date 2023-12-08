export const parseName = name => {
  const parsedName = {};

  const hyphenatedNames = ['ho-oh', 'porygon-z', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu', 'red-striped', 'blue-striped', 'white-striped'];
  const otherHyphenatedNames = ['jangmo-o', 'hakamo-o', 'kommo-o'];
  const formes = ['deoxys', 'giratina', 'shaymin', 'tornadus', 'thundurus', 'landorus', 'meloetta', 'aegislash', 'zygarde'];
  const forms = ['basculin', 'keldeo'];

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

    // Gender
    if (parsedName?.male) {
      printName += ' (Male)';
    }
    else if (parsedName?.female) {
      printName += ' (Female)';
    }

    // Size
    if (parsedName.size) {
      printName += ' (' + parsedName.size.charAt(0).toUpperCase() + parsedName.size.slice(1) + ' Size)';
    }

    // Style
    if (parsedName.style) {
      printName += ' (' + parsedName.style + ' Style)';
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

  // Hyphenated name
  if (hyphenatedNames.includes(name)) {
    parsedName.hyphenated = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
  }
  // Hyphenated with lowercase second word
  if (otherHyphenatedNames.some(hyphenatedName => name.includes(hyphenatedName))) {
    parsedName.hyphenated = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
    const index = parsedName.hyphenated.lastIndexOf('-');
    parsedName.hyphenated = parsedName.hyphenated.substring(0, index) + '-' + parsedName.hyphenated.substring(index + 1, index + 2).toLowerCase();
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

  // Formes
  if (formes.some(forme => name.includes(forme))) {
    parsedName.formWithAnE = true;
  }

  // Forms
  if (forms.concat(formes).some(form => name.includes(form))) {
    const splitName = parsedName.form = name.split('-');
    name = splitName[0];
    const form = splitName.filter(word => word !== name).map(word => word.charAt(0) + word.slice(1)).join('-');
    if (hyphenatedNames.some(hyphenatedName => form.includes(hyphenatedName))) {
      parsedName.form = form.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
    }
    else {
      parsedName.form = form.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
  if (name.includes('oricorio')) {
    const splitName = name.split('-');
    name = splitName[0];
    const form = splitName.filter(word => word !== name).map(word => word.charAt(0) + word.slice(1)).join('-');
    console.log(form);
    if (form === 'pau') {
      parsedName.style = 'Pa\'u';
    }
    else if (form === 'pom-pom') {
      parsedName.style = 'Pom-Pom';
    }
    else {
      parsedName.style = form.charAt(0).toUpperCase() + form.slice(1);
    }
  }
  
  return parsedName.print();
}
