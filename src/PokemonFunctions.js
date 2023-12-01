export const parseName = name => {
  const words = name?.split('-');
  if (words) {
    if (words[words.length - 1] === 'mega') {
      words.unshift(words.pop());
    }
    else if (words[words.length - 1] === 'gmax') {
      words.pop();
      words.unshift('Gigantamax');
    }
  }
  return words?.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
