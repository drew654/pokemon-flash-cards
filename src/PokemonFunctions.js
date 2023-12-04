export const parseName = name => {
  const parsedName = {};

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

    // Rest of name
    printName += name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
    
  // Mega (X/Y)
  if (name.includes('mega')) {
    if (name.includes('mega-x')) {
      parsedName.mega = 'Mega X';
      name = name.replace('-mega-x', '');
    }
    else if (name.includes('mega-y')) {
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
