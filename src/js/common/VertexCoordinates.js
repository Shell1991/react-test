var std_diff_grids_hor = 0.00142397489505926;
var half_lon_r = 0.00071198744752963;
var sqrt_lat_r = 0.0011681809752112596;
function id2hexagon(lat, lon) {
    var rs = [];
    rs.push([parseFloat(lat), parseFloat(lon) - parseFloat(std_diff_grids_hor)]);
    rs.push([parseFloat(lat) + parseFloat(sqrt_lat_r), parseFloat(lon) - parseFloat(half_lon_r)]);
    rs.push([parseFloat(lat) + parseFloat(sqrt_lat_r), parseFloat(lon) + parseFloat(half_lon_r)]);
    rs.push([parseFloat(lat), parseFloat(lon) + parseFloat(std_diff_grids_hor)]);
    rs.push([parseFloat(lat) - parseFloat(sqrt_lat_r), parseFloat(lon) + parseFloat(half_lon_r)]);
    rs.push([parseFloat(lat) - parseFloat(sqrt_lat_r), parseFloat(lon) - parseFloat(half_lon_r)]);
    return rs
}
export default id2hexagon;