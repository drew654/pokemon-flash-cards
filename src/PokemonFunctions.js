export const parseName = name => {
  const parsedName = {};

  const hyphenatedNames = ['ho-oh', 'porygon-z', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu'];
  const otherHyphenatedNames = ['jangmo-o', 'hakamo-o', 'kommo-o'];
  const formes = ['deoxys'];

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

    // Forme
    if (parsedName.forme) {
      printName += ' (' + parsedName.forme.charAt(0).toUpperCase() + parsedName.forme.slice(1) + ' Forme)';
    }

    // Cloak
    if (parsedName.cloak) {
      printName += ' (' + parsedName.cloak.charAt(0).toUpperCase() + parsedName.cloak.slice(1) + ' Cloak)';
    }

    // Mega X/Y
    if (parsedName?.mega?.length === 6) {
      printName += ' ' + parsedName.mega.charAt(5);
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

  // Formes
  if (formes.some(forme => name.includes(forme))) {
    const splitName = parsedName.forme = name.split('-');
    parsedName.forme = splitName[splitName.length - 1];
    name = name.replace('-' + parsedName.forme, '');
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
  
  return parsedName.print();
}
