function IpValidator(ip) {
  const items = ip.split("#");
  if (items.length !== 4) {
    return false;
  }
  for (let i = 0; i < items.length; i++) {
    const item = Number(items[i]);
    if (i === 0) {
      if (Number.isNaN(item) || item < 1 || item > 128) {
        return false;
      }
    } else if (Number.isNaN(item) || item < 0 || item > 255) {
      return false;
    }
  }
  let ipValue = 0;
  for (let i = 0; i < 4; i++) {
    ipValue = ipValue * 256 + parseInt(items[i], 10);
  }
  return ipValue;
}

console.log(IpValidator("128#0#0#1"));
console.log(IpValidator("100#101#1#5"));
console.log(IpValidator("a#101#1#5"));
console.log(IpValidator("135#101#1#5"));

function vlanValidator(numbers, number) {
  const items = numbers.split(",");
}
