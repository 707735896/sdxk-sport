let Split = {};
// 截取value值
Split.cutValue = function (target, name) {
    let arr = []
    for (let i = 0; i < target.length; i++) {
        if(target[i][name] && target[i].key) {
            if(target[i][name] == '操作' || target[i].key == 'operation') {
                continue;
            }
            arr.push(target[i][name])
        }

    }
    return arr

}

export default Split 