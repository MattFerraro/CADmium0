export function makePlane(oc, action) {
    const oc_origin = new oc.gp_Pnt_3(...action.origin)
    const oc_normal = new oc.gp_Vec_4(...action.normal)
    // const oc_xAxis = new oc.gp_Vec_4(...xAxis)
    const oc_normal_dir = new oc.gp_Dir_2(oc_normal)

    const oc_plane = new oc.gp_Pln_3(oc_origin, oc_normal_dir)

    const plane = {
        name: action.name, origin: action.origin, normal: action.normal, oc_origin, oc_normal, oc_plane
    }

    return plane
}