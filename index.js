const PNG = require('pngjs').PNG

process.stdin
  .pipe(
    new PNG({ colorType: 2 })
  )
  .on('parsed', function () {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let i = (this.width * y + x) * 4
	let d = this.data[i] * 2 ** 16 + 
          this.data[i + 1] * 2 ** 8 + 
          this.data[i + 2]
        let h = (d < 2 ** 23) ? d : d - 2 ** 24
        if (h == - (2 ** 23)) {
          h = 0
        } else {
          h *= 0.01
        }
	let box = Math.round(10 * (h + 10000)).toString(16)
	let boxr = parseInt(box.slice(-6, -4), 16)
	let boxg = parseInt(box.slice(-4, -2), 16)
	let boxb = parseInt(box.slice(-2), 16)
	const rgb = [0, 1, 2].map(j => {
          return this.data[i + j].toString()
        }).join()
	this.data[i] = boxr
	this.data[i + 1] = boxg
	this.data[i + 2] = boxb
	// console.error(`(${x}, ${y}) ${rgb} ${h} -> ${box} (${boxr},${boxg},${boxb})`)
      }
    }
    this.pack().pipe(process.stdout)
  })

