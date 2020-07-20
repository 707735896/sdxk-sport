//体检项目参考值配置
const physicalConfig = [
    {
        'department': '形体',
        'itemType': '身高',
        'item': '身高',
        'action': '2239fd8aaea54009aadea6ab822aef2b',
        'unit': '厘米(cm)',
        'result': '数值，_ _ _._ @单位为厘米(cm)',
        'type': 'newline',
        'col1': {
            col: 1,
            row: 2
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '形体',
        'itemType': '体重',
        'item': '体重',
        'action': '75cab047bf274671bd0ca1834ec3da90',
        'unit': '公斤(kg)',
        'result': '数值，_ _ _._ @单位为公斤(kg)',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    // {
    //     'department': '胸围',
    //     'itemType': '胸围',
    //     'item': '胸围',
    //     'action': '17A4564A4AC04DF5AA5DA0DA486BC2B0',
    //     'unit': '厘米(cm)',
    //     'result': '数值，_ _ _._ @单位为厘米(cm)',
    //     'type': 'newline',
    //     'col1': {
    //         col: 1,
    //         row: 1
    //     },
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     }
    // },
    {
        'department': '生理功能',
        'itemType': '血压',
        'item': '收缩压',
        'action': '9ed4b87c56514ffdbe2e58bc7f4aac33',
        'unit': '毫米/汞柱(mmHG)',
        'result': '数值，_ _ _ @单位为毫米/汞柱(mmHG)',
        'type': 'newline',
        'col1': {
            col: 1,
            row: 3
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '生理功能',
        'itemType': '血压',
        'item': '舒张压',
        'action': '9803d231a46d4817ac8e390c0f91e923',
        'unit': '毫米/汞柱(mmHG)',
        'result': '数值，_ _ _@单位为毫米/汞柱(mmHG)',
        'type': 'newline',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '生理功能',
        'itemType': '心率',
        'item': '心率',
        'unit': '次/分钟',
        'action': '65c75a15844f4436a5df4f36e59273a2',
        'result': '数值，_ _ _ @单位为次/分钟',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },

    {
        'department': '眼科',
        'itemType': '结膜',
        'item': '结膜',
        'action': '', //5a81dc42605844858f6605724bc6c024
        'unit': '',
        'result': '正常/异常',
        'col1': {
            col: 1,
            row: 21
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '角膜',
        'item': '角膜',
        'action': '', // 1c24013eece6486885dec9cfd84d8e62
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '晶体',
        'item': '晶体',
        'action': '', // cf9096be605947baa2c57f31469a8100
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '瞳孔',
        'item': '瞳孔',
        'action': '', // 8bc1bf9b6c644bb29dcf407894aface3
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '眼位',// a26cba9ce895426cab9ef1bd39590949
        'item': '眼位',
        'action': '',
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '眼球运动',// 6d32ae688d3d49e595195bf15e1b82f2
        'item': '眼球运动',
        'action': '',
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '异常视觉行为',// 3e2b0a4f6a6246fdb9a74ae616361320
        'item': '异常视觉行为',
        'action': '',
        'unit': '',
        'result': '无/畏光/眯眼/歪头/其他',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '临床印象', // 6c0c7ba2d28b459c840925abd2a6cccb
        'item': '临床印象',
        'action': '',
        'unit': '',
        'result': '未见异常/斜视/沙眼/结膜炎/其他',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '戴镜情况', // 140b8db7096d49b09ef53e5ebb197c31
        'item': '戴镜情况',
        'action': '140b8db7096d49b09ef53e5ebb197c31',
        'unit': 'D',
        'result': '不戴镜/佩戴框架眼镜/配带隐形眼镜/佩戴角膜塑形镜*@右眼 数值，_.__D*    左眼 数值，_.__D*',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    // {
    //     'department': '眼科',
    //     'itemType': '戴镜情况', // 140b8db7096d49b09ef53e5ebb197c31
    //     'item': '戴镜情况',
    //     'action': '',
    //     'unit': '度',
    //     'result': '右眼 数值，_.__D*'
    // },
    // {
    //     'department': '眼科',
    //     'itemType': '戴镜情况',
    //     'item': '戴镜情况',
    //     'action': '',
    //     'unit': '度',
    //     'result': '左眼 数值，_.__D*'
    // },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '右眼',
        // 'action': 'C5A47A50B9F74A6AAB027052149F57AB',
        'unit': '度',
        'result': '①+ ②- ③0 球镜（s）_.__D',
        'col2': {
            col: 1,
            row: 6
        },
        'col3': {
            col: 1,
            row: 3
        }
    },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '右眼',
        // 'action': 'D802934B0FC64E26B10482B59A822A9F',
        'unit': '度',
        'result': '①+ ②- ③0 球镜（c）_.__D'
    },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '右眼',
        // 'action': '941ADD1DAB0D4BE6950DEEAF6BAB5F62',
        'unit': '度',
        'result': '轴向值（A）___',
    },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '左眼',
        // 'action': '11E2AF14648740AAB01EF892E5F626F7',
        'unit': '度',
        'result': '①+ ②- ③0 球镜（s）_.__D',
        'col3': {
            col: 1,
            row: 3
        }
    },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '左眼',
        // 'action': 'F11AC507F73049A9B88E1920BBCB4F79',
        'unit': '度',
        'result': '①+ ②- ③0 球镜（c）_.__D',
    },
    {
        'department': '眼科',
        'itemType': '屈光度检查',
        'item': '左眼',
        // 'action': '9EA947566E1841129A452526F2D9F246',
        'unit': '度',
        'result': '轴向值（A）___',
    },
    {
        'department': '眼科',
        'itemType': '屈光临床印象', // 9AE5A5E03B980150DEEAF6BAB5F62887
        'item': '屈光临床印象',
        'action': '',
        'unit': '',
        'result': '未见异常/近视/远视/弱视/散光/其他',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '角膜曲率半径*', // 280b02e3c19949acb7afb97321baef23
        'item': '角膜曲率半径',
        'action': '',
        'unit': 'mm',
        'result': '__.__mm',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '眼轴长度*', // 33140b8db70969e595195bf15e1b82f2
        'item': '眼轴长度',
        'action': '',
        'unit': 'mm',
        'result': '__.__mm',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '色觉*',// 4e595195bf15e1b829e595195bf15e1b
        'item': '',
        'action': '',
        'unit': '',
        'result': '正常/异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '随访*',// 936e595195bf15e1b82195bf15e1b82f
        'item': '',
        'action': '',
        'unit': '',
        'result': '',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '眼科',
        'itemType': '转诊*', // 836e595195bf19a74ae6163613215e1b
        'item': '',
        'action': '',
        'unit': '',
        'result': '',
        'col2': {
            col: 2,
            row: 1
        }
    },

    {
        'department': '视力',
        'itemType': '裸眼视力',
        'item': '右眼',
        'action': '1166bb360c164301af0dcd511dc51d5b',
        'unit': '度',
        'result': '数值， _._ ',
        'col1': {
            col: 1,
            row: 4
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '视力',
        'itemType': '裸眼视力',
        'item': '左眼',
        'action': '0c2345886b404c20b11644016de790fb',
        'unit': '度',
        'result': '数值， _._ ',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '视力',
        'itemType': '戴镜视力*',
        'item': '右眼',
        'action': '6178ff6f2cc34219adf6644611aaccc5',
        'unit': '度',
        'result': '数值， _._ ',
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '视力',
        'itemType': '戴镜视力*',
        'item': '左眼',
        'action': '4d8fc73468d74250a4f5c3cf5eb32898',
        'unit': '度',
        'result': '数值， _._ ',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '齿列',
        'item': '齿列',
        'action': '',
        'result': '整齐/不齐 ',
        'col1': {
            col: 1,
            row: 10
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '牙周',
        'item': '牙周',
        'action': '',
        'result': '正常/异常',
        // 'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '有无龋齿',
        'item': '有无龋齿',
        'action': '',
        'unit': '颗',
        'result': '无/有',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '乳牙',
        'action': 'b3a8a3525b4a41879a3711fad851f7e2',
        'unit': '颗',
        'result': '数值，_',
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋患牙数',
        'item': '恒牙',
        'action': '9c9544f49d70433ba354aaf68fddd36f',
        'unit': '颗',
        'result': '数值，_ ',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '乳牙',
        'action': '9f60daf57a544993ad86e9e3f4e7575f',
        'unit': '颗',
        'result': '数值，_ ',
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋失牙数',
        'item': '恒牙',
        'action': 'c18d243702db4ef98e5ec8fe05a52310',
        'unit': '颗',
        'result': '数值，_',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '乳牙',
        'action': '25e2916dd6514653992dadfedec95b7a',
        'unit': '颗',
        'result': '数值，_',
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '龋补牙数',
        'item': '恒牙',
        'action': '8abcfdd9796342269be502c5a1e62ce0',
        'unit': '颗',
        'result': '数值，_',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '口腔科',
        'itemType': '其他记录*',
        'item': '其他记录*',
        'action': '',
        'result': '文本内容 ',
        'col2': {
            col: 2,
            row: 1
        }
    },

    {
        'department': '外科',
        'itemType': '皮肤',
        'item': '皮肤',
        'action': '',
        'result': '正常/潮红/苍白/发绀/黄染/色素沉着/@湿疹/糜烂/其他（需说明）',
        'type': 'newline',
        'col1': {
            col: 1,
            row: 8
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '淋巴结',
        'item': '淋巴结',
        'action': '',
        'result': '未触及/锁骨上/腋窝/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '头部',
        'item': '头部',
        'action': '',
        'result': '正常/耳廓畸形/头部外伤/其他（需说明）',
        // 'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '颈部',
        'item': '颈部',
        'action': '',
        'result': '正常/甲状腺肿大/颈部外伤/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '脊柱',
        'item': '脊柱',
        'action': '',
        'result': '正常/脊柱侧弯/脊柱矫正中/脊柱术后/脊柱呈S型/@脊柱后凸/其他（需说明）',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '四肢',
        'item': '四肢',
        'action': '',
        'result': '正常/骨折/先天畸形/扁平足/跛行/其他（需说明）',
        // 'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '胸部',
        'item': '胸部',
        'action': '',
        'result': '正常/桶装胸/扁平胸/鸡胸/漏斗胸/其他（需说明）',
        // 'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '外科',
        'itemType': '其他记录*',
        'item': '其他记录*',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '内科',
        'itemType': '近期不适症状（可多选）',
        'item': '近期不适症状（可多选）',
        'action': '',
        'result': '疲乏无力/低热/盗汗/胸痛/咳嗽/咳痰/食欲减退/消瘦',
        'col1': {
            col: 1,
            row: 7
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '内科',
        'itemType': '其他症状*',
        'item': '其他症状*',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    },
    // {
    //     'department': '内科',
    //     'itemType': '心率',
    //     'item': '心率',
    //     'action': 'f3029256-7c7b-4e82-8b88-fb9cf8e844f5',
    //     'result': '数值，_ _ _@单位为次/分钟',
    //     'unit': '次/分钟',
    //     'type': 'newline',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     }
    // },
    {
        'department': '内科',
        'itemType': '心',
        'item': '心',
        'action': '',
        'result': '正常/心脏杂音/心律不齐/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    // {
    //     'department': '内科',
    //     'itemType': '心脏杂音',
    //     'item': '心脏杂音',
    //     'action': '',
    //     'result': '无/有',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     }
    // },
    // {
    //     'department': '内科',
    //     'itemType': '心律',
    //     'item': '心律',
    //     'action': '',
    //     'result': '齐/不齐/绝对不齐',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     }
    // },
    {
        'department': '内科',
        'itemType': '肺',
        'item': '肺',
        'action': '',
        'result': '正常/哮鸣音/干罗音/湿罗音/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '内科',
        'itemType': '肝',
        'item': '肝',
        'action': '',
        'result': '正常/肝肿大/肝区压痛/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '内科',
        'itemType': '脾',
        'item': '脾',
        'action': '',
        'result': '正常/脾肿大/脾区压痛/其他（需说明）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '内科',
        'itemType': '其他记录*',
        'item': '其他记录*',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '检验科',
        'itemType': '肝功能',
        'item': '谷丙转氨酶 ALT **',
        'unit': '单位/升(U/L)',
        'action': '06614cc576f743f19ab58d60729b9786',
        'result': '数值，_ _ ._ _ @单位为单位/升(U/L)',
        'type': 'newline',
        'col1': {
            col: 1,
            row: 4
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '检验科',
        'itemType': '肝功能',
        'item': '总胆红素 TBIL **',
        'unit': '微摩尔/升(μmo/L)',
        'action': 'ae6d475c3a3a4c5687195b6da1beb567',
        'result': '数值，_ _ ._ _ @单位为微摩尔/升(μmo/L)',
        'type': 'newline',
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'department': '检验科',
        'itemType': '血红蛋白**',
        'item': '血红蛋白**',
        'unit': '克/升(g/L)',
        'action': 'd66e98043e5b476e89780618c604a79e',
        'result': '数值，_ _ ._ _ @单位为克/升(g/L)',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    // {
    //     'department': '检验科',
    //     'itemType': '结核菌素实验',
    //     'item': '结核菌素实验',
    //     'unit': '',
    //     'action': '',
    //     'result': '阴性/阳性/强阳性',
    //     'type': '',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     }
    // },
    {
        'department': '检验科',
        'itemType': '其他化验结果*',
        'item': '其他化验结果*',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核病筛查检查',
        'itemType': '确认有无卡介苗接种史或卡痕？',
        'item': '确认有无卡介苗接种史或卡痕？',
        'action': '',
        'result': '无/有',
        'col1': {
            col: 1,
            row: 2
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核病筛查检查',
        'itemType': '医生意见',
        'item': '医生意见',
        'action': '',
        'result': '是肺结核可疑症状者/是肺结核密切接触者',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射时间',
        'item': '注射时间',
        'action': '',
        'unit': '毫米(mm)',
        'result': '（月/日/时）',
        'col1': {
            col: 1,
            row: 6
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '硬结直径（横径x纵径）',
        'item': '硬结直径（横径x纵径）',
        'action': 'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'unit': '毫米(mm)',
        'result': '数值，_ _ ._ _ @单位为毫米(mm)',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '平均直径',
        'item': '平均直径',
        'action': '64BE4EE6A5CE4474A443A607AD19D186',
        'unit': '毫米(mm)',
        'result': '数值，_ _ ._ _ @单位为毫米(mm)',
        'type': 'newline',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '注射后局部情况',
        'item': '注射后局部情况',
        'action': '',
        'unit': '毫米(mm)',
        'result': '水疱/溃疡/坏死/淋巴管炎/无异常',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '检验反应时间',
        'item': '检验反应时间',
        'action': '',
        'result': '（月/日/时）',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '结核菌素皮肤试验检查',
        'itemType': '结果判定**',
        'item': '结果判定**',
        'action': '',
        'unit': '毫米(mm)',
        'result': '阴性/一般阳性/中度阳性/强阳性',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '检查科',
        'itemType': '胸部X线检查**',
        'item': '胸部 X 线检查**',
        'action': '',
        'result': '未见异常/异常@异常需填写异常情况描述',
        'type': 'newline',
        'col1': {
            col: 1,
            row: 1
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '主检',
        'itemType': '本次体检结论',
        'item': '本次体检结论',
        'action': '',
        'result': '文本内容',
        'col1': {
            col: 1,
            row: 3
        },
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '主检',
        'itemType': '健康评价',
        'item': '健康评价',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    },
    {
        'department': '主检',
        'itemType': '健康指导',
        'item': '健康指导',
        'action': '',
        'result': '文本内容',
        'col2': {
            col: 2,
            row: 1
        }
    }
];

//体检项目规划表格数据
const getexaminationPlan = [
    {
        'id': '2239fd8aaea54009aadea6ab822aef2b',
        'department': '形体', // 8EE7B19DFAC74C7E898E983785800A0A
        'itemType': '身高', // 2239fd8aaea54009aadea6ab822aef2b
        'item': '身高',
        'col1': {
            col: 1,
            row: 2
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '75cab047bf274671bd0ca1834ec3da90',
        'department': '形体',// 8EE7B19DFAC74C7E898E983785800A0A
        'itemType': '体重', // 75cab047bf274671bd0ca1834ec3da90
        'item': '体重',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    // {
    //     'id': '17A4564A4AC04DF5AA5DA0DA486BC2B0',
    //     'department': '胸围', // 424095301EF0DCE4474A443A607AD19D
    //     'itemType': '胸围', //17A4564A4AC04DF5AA5DA0DA486BC2B0
    //     'item': '胸围',
    //     'col1': {
    //         col: 1,
    //         row: 1
    //     },
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     },
    //     'col3': {
    //         col: 1,
    //         row: 1
    //     }
    // },
    {
        'id': '85e664a24bb54df99332956306500355',
        'department': '生理功能', // 8e185be85aa84a69894d33bc80aee4dc
        'itemType': '血压', // 85e664a24bb54df99332956306500355
        'item': '收缩压', // 9ed4b87c56514ffdbe2e58bc7f4aac33
        'col1': {
            col: 1,
            row: 3
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '85e664a24bb54df99332956306500355',
        'department': '生理功能', // 8e185be85aa84a69894d33bc80aee4dc
        'itemType': '血压',// 85e664a24bb54df99332956306500355
        'item': '舒张压' // 9803d231a46d4817ac8e390c0f91e923
    },
    {
        'id': '65c75a15844f4436a5df4f36e59273a2',
        'department': '生理功能',// 8e185be85aa84a69894d33bc80aee4dc
        'itemType': '心率', // 65c75a15844f4436a5df4f36e59273a2
        'item': '心率',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },

    {
        'id': '5a81dc42605844858f6605724bc6c024',
        'department': '眼科', // a6efcc860d76449ab45de28bf128f769
        'itemType': '结膜', // 5a81dc42605844858f6605724bc6c024
        'item': '',
        'col1': {
            col: 1,
            row: 17
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '1c24013eece6486885dec9cfd84d8e62',
        'department': '眼科',// a6efcc860d76449ab45de28bf128f769
        'itemType': '角膜', // 1c24013eece6486885dec9cfd84d8e62
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'cf9096be605947baa2c57f31469a8100',
        'department': '眼科',// a6efcc860d76449ab45de28bf128f769
        'itemType': '晶体',// cf9096be605947baa2c57f31469a8100
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '8bc1bf9b6c644bb29dcf407894aface3',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '瞳孔',// 8bc1bf9b6c644bb29dcf407894aface3
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'a26cba9ce895426cab9ef1bd39590949',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '眼位',//a26cba9ce895426cab9ef1bd39590949
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '6d32ae688d3d49e595195bf15e1b82f2',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '眼球运动',//6d32ae688d3d49e595195bf15e1b82f2
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '3e2b0a4f6a6246fdb9a74ae616361320',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '异常视觉行为',//3e2b0a4f6a6246fdb9a74ae616361320
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '6c0c7ba2d28b459c840925abd2a6cccb',
        'department': '眼科', //a6efcc860d76449ab45de28bf128f769
        'itemType': '临床印象', // 6c0c7ba2d28b459c840925abd2a6cccb
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '140b8db7096d49b09ef53e5ebb197c31',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '戴镜情况',//140b8db7096d49b09ef53e5ebb197c31
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '32e46fb6929f4daea021d77af55aa3bb',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '屈光度检查', // 32e46fb6929f4daea021d77af55aa3bb -> 改 e19ace3a2be24fbb9679c648fa868bc9
        'item': '右眼', // c8996f32cd6944aeb5b7c6052e4ffd26
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '32e46fb6929f4daea021d77af55aa3bb',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '屈光度检查',// 32e46fb6929f4daea021d77af55aa3bb  -> 改 e19ace3a2be24fbb9679c648fa868bc9
        'item': '左眼' // a407b18e30784039b49e6a65fe2e0045
    },
    {
        'id': '9AE5A5E03B980150DEEAF6BAB5F62887',
        'department': '眼科', //a6efcc860d76449ab45de28bf128f769
        'itemType': '屈光临床印象', // 9AE5A5E03B980150DEEAF6BAB5F62887
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '280b02e3c19949acb7afb97321baef23',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '角膜曲率半径*',//280b02e3c19949acb7afb97321baef23
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '33140b8db70969e595195bf15e1b82f2',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '眼轴长度*',//33140b8db70969e595195bf15e1b82f2
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '4e595195bf15e1b829e595195bf15e1b',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '色觉*',//4e595195bf15e1b829e595195bf15e1b
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '936e595195bf15e1b82195bf15e1b82f',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '随访*',//936e595195bf15e1b82195bf15e1b82f
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '836e595195bf19a74ae6163613215e1b',
        'department': '眼科',//a6efcc860d76449ab45de28bf128f769
        'itemType': '转诊*',//836e595195bf19a74ae6163613215e1b
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },

    {
        'id': '10205c35f4e24926a7f3160fa5633545',
        'department': '视力', // 3438ae5f1a8249c192c0e8abf1629210
        'itemType': '裸眼视力', // 10205c35f4e24926a7f3160fa5633545
        'item': '右眼', //  1166bb360c164301af0dcd511dc51d5b
        'col1': {
            col: 1,
            row: 4
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '10205c35f4e24926a7f3160fa5633545',
        'department': '视力', // 3438ae5f1a8249c192c0e8abf1629210
        'itemType': '裸眼视力', // 10205c35f4e24926a7f3160fa5633545
        'item': '左眼', //  0c2345886b404c20b11644016de790fb
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '5cde8e9b1c00449a89b5c0d4a22b6bca',
        'department': '视力',// 3438ae5f1a8249c192c0e8abf1629210
        'itemType': '戴镜视力*',// 5cde8e9b1c00449a89b5c0d4a22b6bca
        'item': '右眼', // 6178ff6f2cc34219adf6644611aaccc5
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '5cde8e9b1c00449a89b5c0d4a22b6bca',
        'department': '视力',// 3438ae5f1a8249c192c0e8abf1629210
        'itemType': '戴镜视力*',// 5cde8e9b1c00449a89b5c0d4a22b6bca
        'item': '左眼'// 4d8fc73468d74250a4f5c3cf5eb32898
    },

    {
        'id': '105e7d5a2f6143b389161095a9e0b67b',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '齿列', // 105e7d5a2f6143b389161095a9e0b67b
        'item': '齿列',
        'col1': {
            col: 1,
            row: 10
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '0783f1f2ed1c468aaec51940ae642dff',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '牙周',// 0783f1f2ed1c468aaec51940ae642dff
        'item': '牙周',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'e8939b0116384bd8a7cb6c5b6690c3de',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '有无龋齿',// e8939b0116384bd8a7cb6c5b6690c3de
        'item': '有无龋齿',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'f17b10c29f354b778de8752aa0b745f9',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋患牙数',// f17b10c29f354b778de8752aa0b745f9
        'item': '乳牙', // b3a8a3525b4a41879a3711fad851f7e2
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': 'f17b10c29f354b778de8752aa0b745f9',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋患牙数',// f17b10c29f354b778de8752aa0b745f9
        'item': '恒牙',// 9c9544f49d70433ba354aaf68fddd36f
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '302555030f844a12970c432401033b51',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋失牙数',// 302555030f844a12970c432401033b51
        'item': '乳牙',// 9f60daf57a544993ad86e9e3f4e7575f
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '302555030f844a12970c432401033b51',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋失牙数',// 302555030f844a12970c432401033b51
        'item': '恒牙'// c18d243702db4ef98e5ec8fe05a52310
    },
    {
        'id': '00d990328454449f9911199c84ebf480',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋补牙数',// 00d990328454449f9911199c84ebf480
        'item': '乳牙',// 25e2916dd6514653992dadfedec95b7a
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '00d990328454449f9911199c84ebf480',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '龋补牙数',// 00d990328454449f9911199c84ebf480
        'item': '恒牙'// 8abcfdd9796342269be502c5a1e62ce0

    },
    {
        'id': 'dfd5e88d178148d5a3bcc2e5b10f9a0c',
        'department': '口腔科',// b8b0af7f6dab499281ceb9dc31ff2dcb
        'itemType': '其他记录',// dfd5e88d178148d5a3bcc2e5b10f9a0c
        'item': '其他记录',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },

    {
        'id': '521d40d94f3a46ffbc91f3a804f07072',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '皮肤',// 521d40d94f3a46ffbc91f3a804f07072
        'item': '皮肤',
        'action': '',
        'col1': {
            col: 1,
            row: 8
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'e035d43b35ce41d5b507096893936ec8',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '淋巴结',// e035d43b35ce41d5b507096893936ec8
        'item': '淋巴结',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'ef4e0d4c230f447694e7f09bff6b210b',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '头部',// ef4e0d4c230f447694e7f09bff6b210b
        'item': '头部',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '8df68d987e6144bc9b8fe8cad741667b',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '颈部',// 8df68d987e6144bc9b8fe8cad741667b
        'item': '颈部',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'c5b3a0e3664e4643824a63db03fa6fc1',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '脊柱',// c5b3a0e3664e4643824a63db03fa6fc1
        'item': '脊柱',
        'action': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '6e24ba8a4d62496892a668ce7db49bcc',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '四肢',// 6e24ba8a4d62496892a668ce7db49bcc
        'item': '四肢',
        'action': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '2bbae6cfd92344a08eb45f15007fa388',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '胸部',// 2bbae6cfd92344a08eb45f15007fa388
        'item': '胸部',
        'action': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '539d3d6760244375bfb341e4956a9ec5',
        'department': '外科',// 7c59edca1a434725b9b11702876858b3
        'itemType': '其他记录',// 539d3d6760244375bfb341e4956a9ec5
        'item': '其他记录',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '39F516FEBEEE4A9CB55A083B1094756A',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '近期不适症状（可多选）',// 39F516FEBEEE4A9CB55A083B1094756A
        'item': '',
        'col1': {
            col: 1,
            row: 7
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '7E9800D8ADB8473C81EF6F595BF7F527',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '其他症状*',// 7E9800D8ADB8473C81EF6F595BF7F527
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'f3029256-7c7b-4e82-8b88-fb9cf8e844f5',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '心',// f3029256-7c7b-4e82-8b88-fb9cf8e844f5
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    // {
    //     'id': '11E03426F9514D8AA3D1E118FBA7FD0E',
    //     'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
    //     'itemType': '心脏杂音',// 11E03426F9514D8AA3D1E118FBA7FD0E
    //     'item': '',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     },
    //     'col3': {
    //         col: 1,
    //         row: 1
    //     }
    // },
    // {
    //     'id': 'A1A9115600FD4C9CA297DD393C98461F',
    //     'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
    //     'itemType': '心律',// A1A9115600FD4C9CA297DD393C98461F
    //     'item': '',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     },
    //     'col3': {
    //         col: 1,
    //         row: 1
    //     }
    // },
    {
        'id': '1F07ED78C487455FA73EA52DB62CAA10',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '肺',// 1F07ED78C487455FA73EA52DB62CAA10
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'd1c02fea23e34848a5b078f82651119f',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '肝',// d1c02fea23e34848a5b078f82651119f
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '0e5bf11d0b3a4324b0af981fdefe012b',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '脾',// 0e5bf11d0b3a4324b0af981fdefe012b
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '09377ddd3f194ac5b81d6b825e2d3d21',
        'department': '内科',// f8845b0393d64726a9cc269d25ded5fd
        'itemType': '其他记录*',// 09377ddd3f194ac5b81d6b825e2d3d21
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '922a93344d9846808028008b540d3190',
        'department': '检验科',// d56fcfc34fa94d99a4e3ea5ce775a1f7
        'itemType': '肝功能',// 922a93344d9846808028008b540d3190
        'item': '谷丙转氨酶 ALT **',// 06614cc576f743f19ab58d60729b9786
        'col1': {
            col: 1,
            row: 4
        },
        'col2': {
            col: 1,
            row: 2
        },
        'col3': {
            col: 1,
            row: 2
        }
    },
    {
        'id': '922a93344d9846808028008b540d3190',
        'department': '检验科',// d56fcfc34fa94d99a4e3ea5ce775a1f7
        'itemType': '肝功能',// 922a93344d9846808028008b540d3190
        'item': '总胆红素 TBIL **'// ae6d475c3a3a4c5687195b6da1beb567
    },
    {
        'id': 'd66e98043e5b476e89780618c604a79e',
        'department': '检验科',// d56fcfc34fa94d99a4e3ea5ce775a1f7
        'itemType': '血红蛋白**',// d66e98043e5b476e89780618c604a79e
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    // {
    //     'id': 'A9AE5A5E03B98015BBF40CC0984E4496',
    //     'department': '检验科',// d56fcfc34fa94d99a4e3ea5ce775a1f7
    //     'itemType': '结核菌素实验',// A9AE5A5E03B98015BBF40CC0984E4496
    //     'item': '',
    //     'col2': {
    //         col: 2,
    //         row: 1
    //     },
    //     'col3': {
    //         col: 1,
    //         row: 1
    //     }
    // },
    {
        'id': '940e39103fff4417958072f3866bda2c',
        'department': '检验科',// d56fcfc34fa94d99a4e3ea5ce775a1f7
        'itemType': '其他化验结果*',// 940e39103fff4417958072f3866bda2c
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '049A9B88E1920BBCB4F79EA947566E14',
        'department': '结核病筛查检查',// 920a5cf8cd2848aa91995f80888291b9
        'itemType': '确认有无卡介苗接种史或卡痕',// 049A9B88E1920BBCB4F79EA947566E14
        'item': '',
        'col1': {
            col: 1,
            row: 2
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '1EAFA785938A424095301EF0DA863D70',
        'department': '结核病筛查检查',// 920a5cf8cd2848aa91995f80888291b9
        'itemType': '医生意见',// 1EAFA785938A424095301EF0DA863D70
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '4bcb26ee81bf4df5a83572a9f3fabc20',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '注射时间',// 4bcb26ee81bf4df5a83572a9f3fabc20
        'item': '',
        'col1': {
            col: 1,
            row: 8
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '15A9AE5A5E03B98015BE6A5357E30984',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '注射人',//15A9AE5A5E03B98015BE6A5357E30984
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'CC0984E449608D25357E6A5CE4474A44',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': 'PPD批号',//CC0984E449608D25357E6A5CE4474A44
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '硬结直径（横径x纵径',// cdc1a9ed-8220-4914-bd23-0e2bff92b6e6
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '64BE4EE6A5CE4474A443A607AD19D186',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '平均直径',// 64BE4EE6A5CE4474A443A607AD19D186
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'CB8BEBAD27014DB98A594BD215EAE656',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '注射后局部情况',// CB8BEBAD27014DB98A594BD215EAE656
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'C3ABF40CC0984E449608D25357E361E9',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '检验反应时间',// C3ABF40CC0984E449608D25357E361E9
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': 'BCD804683BA8415A9AE5A5E03B98015B',
        'department': '结核菌素皮肤试验检查',// e0449ee79436491d9ae149287c023efe
        'itemType': '结果判定**',// BCD804683BA8415A9AE5A5E03B98015B
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '286e2367e6e84bb7a004b0ad316d32c8',
        'department': '检查',// d1477eb2c08546c98bc46d71ede96c65
        'itemType': '胸部 X 线检查**',// 286e2367e6e84bb7a004b0ad316d32c8
        'item': '',
        'col1': {
            col: 1,
            row: 1
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '4f8f61a840f1496d827dddc87271c537',
        'department': '主检',// 4CB1D6E85926467392DC1E194032AAF9
        'itemType': '本次体检结论',// 4f8f61a840f1496d827dddc87271c537
        'item': '',
        'col1': {
            col: 1,
            row: 3
        },
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '6d827dddc87271c5374f8f61a840f149',
        'department': '主检',// 4CB1D6E85926467392DC1E194032AAF9
        'itemType': '健康评价',// 6d827dddc87271c5374f8f61a840f149
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    },
    {
        'id': '40f1496d827dddc4f8f61a887271c537',
        'department': '主检',// 4CB1D6E85926467392DC1E194032AAF9
        'itemType': '健康指导',// 40f1496d827dddc4f8f61a887271c537
        'item': '',
        'col2': {
            col: 2,
            row: 1
        },
        'col3': {
            col: 1,
            row: 1
        }
    }
];
export {getexaminationPlan, physicalConfig}
