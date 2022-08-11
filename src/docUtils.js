export function initDoc() {
    const doc = {
        default: {}
    }

    // let's pre-generate some planes and an origin point
    const front = makePlane('front')
    const top = makePlane('top')
    const right = makePlane('right')
    const origin = makePoint('origin')

    doc.default.planes = [top, front, right]
    doc.default.points = [origin]

    return doc
}

export function makePlane(name) {
    const plane = {
        name: name
    }
    return plane
}

export function makePoint(name) {
    const point = {
        name: name
    }
    return point
}