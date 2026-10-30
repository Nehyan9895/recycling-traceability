// Sample data for the demo batch. Every figure here is illustrative, not real.

export const brand = {
  name: 'Yardline',
  plant: 'Recycling operations · Plant 01, Kerala',
};

export const batch = {
  id: 'BX-1027',
  netKg: 1000,
  tareKg: 2410,
  supplier: '[Client name], Infopark, Kochi',
  contents: 'Laptops, desktops, UPS units',
  vehicle: 'KL-07',
  slip: 'WS-88214',
};

export const stages = [
  { label: 'Weigh-in', sub: 'Truck weighed at the gate' },
  { label: 'Batch tagged', sub: 'One code for the whole journey' },
  { label: 'Dismantled', sub: 'Each material weighed' },
  { label: 'Data destroyed', sub: 'Drives logged and shredded' },
  { label: 'Sold', sub: 'Registered buyers, e-invoices' },
  { label: 'EPR filing', sub: 'Ready for the CPCB portal' },
];

export const fractions = [
  { name: 'Plastic casings', kg: 330, color: '#9AA6A0' },
  { name: 'Steel', kg: 210, color: '#56635C' },
  { name: 'Aluminium', kg: 150, color: '#7FA394' },
  { name: 'Circuit boards', kg: 120, color: '#1F5C46' },
  { name: 'Copper', kg: 80, color: '#C9822B' },
  { name: 'Li-ion batteries', kg: 60, color: '#F2B33D' },
  { name: 'Hard drives', kg: 25, color: '#15201B' },
  { name: 'Residue to TSDF', kg: 25, color: '#C6CEC9' },
];

export const tagLog = [
  { t: '10:42', e: 'Label printed and attached to bin' },
  { t: '10:44', e: 'Bin moved to dismantling bay 2' },
  { t: '11:05', e: 'Batch opened by line supervisor' },
  { t: '11:06', e: 'Photos linked to batch record' },
];

export const drives = [
  { sn: 'WX41A9-77K2', kind: 'Laptop SSD' },
  { sn: 'S3Z8NB0-3341', kind: 'Laptop SSD' },
  { sn: 'ZA1K66QP', kind: 'Desktop HDD' },
  { sn: 'WCC4N2-0918', kind: 'Desktop HDD' },
  { sn: 'Y8J2-UPS-04', kind: 'Server HDD' },
];

export const sales = [
  { name: 'Circuit boards', kg: 120, buyer: '[Precious-metal refiner]' },
  { name: 'Copper', kg: 80, buyer: '[Registered smelter]' },
  { name: 'Aluminium', kg: 150, buyer: '[Registered smelter]' },
  { name: 'Li-ion batteries', kg: 60, buyer: '[Battery recycler]' },
  { name: 'Plastic casings', kg: 330, buyer: '[Plastic recycler]' },
];

export const checks = [
  'Weigh-in matches gate slip',
  'Mass balance within tolerance',
  'All buyers registered on the portal',
  'E-invoices generated for every sale',
  'Photos and video attached',
];

// 11x11 pattern for the printed batch label
export const qrPattern =
  '11111110101100000101011010101110101010000010100111111101011101100000010010001011011100101101001100110111111101010010000010011011'.slice(0, 121);
