class Masking {
  format = '';

  value = '';

  constructor(format = '') {
    this.format = format;
  }

  encode(value) {
    let result = '';
    const queque = [...this.value || value][Symbol.iterator]();
    [...this.format.split('')].forEach((letter) => {
      if (letter === '*') {
        const next = queque.next();
        result += next.value ?? '*';
      } else result += letter;
    });
    this.value = result;
    return this;
  }

  decode(value = '') {
    this.value = value.replace(/\D/g, '');
    return this;
  }

  pop(value) {
    const prev = this.value || value;
    let temp = [...prev];
    const deleteCount = [...temp].reverse().join('').match(/^(\W+)+?/g) ?? [''];
    const replace = this.format.slice(-deleteCount[0].length - 1);
    temp = temp.slice(0, -replace.length);
    let result = temp.join('');
    result += replace;
    this.value = result;
    return this;
  }

  append(letter) {
    if (!letter) {
      this.pop();
      return this;
    }
    const firstIndex = this.value.indexOf('*');
    if (firstIndex >= 0) {
      const prev = [...this.value.split('')];
      prev.splice(firstIndex, letter.length, ...letter);
      this.value = prev.join('');
    }
    return this;
  }
}

console.log(new Masking('**.***.*-***.***.***').encode('123456789123456'))
