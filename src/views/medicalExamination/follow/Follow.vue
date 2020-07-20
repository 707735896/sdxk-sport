<template>
    <div class="Follow">
        <div class="content-box">
            <h3 class="title">校医追踪复测</h3>
            <Form class="clearfix search-form" inline label-position="left">
                <FormItem label="学年" :label-width="44">
                    <i-select style="width:120px" v-model="req.year">
                        <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所属区域" :label-width="80">
                    <i-select v-model="req.area_id1" style="width:106px;" @on-change="areaChange">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="req.area_id2" style="width:106px;">
                        <i-option value="-1">全部</i-option>
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="学校名称" :label-width="80">
                    <i-select v-model="req.dep_id" filterable style="width:150px" @on-change="schoolChange"
                              :disabled="!is_manage">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>

                </FormItem>
                <FormItem label="年级" :label-width="40">
                    <i-select v-model="req.grade_no" style="width:120px" @on-change="gradeChange">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of gradeList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="班级" :label-width="40">
                    <i-select v-model="req.class_no" style="width:120px">
                        <Option value="-1">全部</Option>
                        <i-option v-for="item of classList" :key="item.id" :value='item.id'>{{item.class_no}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="体检项" :label-width="60">
                    <i-select v-model="req.prop_id" style="width:140px" ref="propV">
                        <Option value="-1">默认项</Option>
                        <i-option v-for="item of propSelection" :key="item.code" :value='item.id'
                                  @click.native="getCode(item)">{{item.value}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="状态" :label-width="50">
                    <i-select v-model="req.status" style="width:100px">
                        <i-option value="-1">全部</i-option>
                        <i-option :value='1'>正常</i-option>
                        <i-option :value='2'>异常</i-option>
                        <i-option :value='3'>已核实</i-option>
                        <i-option :value='9'>结束追踪</i-option>
                        <i-option :value='10'>追踪中</i-option>
                    </i-select>
                </FormItem>
                <FormItem style="float: right;margin-right: 0!important;">
                    <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
                </FormItem>
            </Form>
            <Divider dashed/>
            <div style="margin-top:4px">
                <div class="add" @click="prints">
                    <img alt="print" src="../../../assets/common/print.png"/>
                    打印
                </div>
            </div>
            <BaseTable border center :columns="columns" ref="reportTable" :data="tableData" :loading="loading"
                   class="reportList"></BaseTable>

            <Page style="text-align: center;margin-top: 20px;"
                  :total="pageConfig.total"
                  show-total
                  show-elevator
                  show-sizer
                  :current='pageConfig.page'
                  :page-size-opts='pageConfig.opts'
                  :page-size='pageConfig.size'
                  @on-change='pageChange'
                  @on-page-size-change='sizeChange'/>
        </div>
        <component :title="modalTitle" :is='com' :planCode='planCode' :year='year' :studentCode='studentCode'
                   :flag="flag" :student_id='student_id' :status="status" @modal-close='ModalClose'></component>
    </div>
</template>

<script>
    import urls from '@/service/Urls';
    import {yearLists, todayYear} from '@/libs/dateUtils';

    // import Info from '../medicalReport/physicalReportInfo';
    import Info from './Info';
    import Print from './Print1';
    import Edit from './Edit';

    export default {
        name: 'Follow',
        data() {
            return {
                loading: true,
                status: status,
                req: {
                    status: '-1',
                    year: todayYear(),
                    area_id1: '-1',
                    area_id2: '-1',
                    dep_id: '-1',
                    grade_no: '-1',
                    class_no: '-1',
                    code: '',
                    prop_id: '-1',
                    student_name: ''
                },
                tableData: [],
                currentRow: {},
                currentid: 0,
                columnsFoot: [{
                    title: '操作',
                    align: 'center',
                    fixed: 'right',
                    width: 180,
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                textAlign: 'left'
                            }
                        }, [
                            h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    marginRight: '20px'
                                },
                                on: {
                                    click: () => {
                                        this.infos(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    attrs: {
                                        src: require('@/assets/common/info.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '详情')
                            ]),
                            h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: params.row.status === 9 ? 'none' : 'inline-block',
                                    cursor: 'pointer',
                                    marginRight: 0
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row);
                                    }
                                }
                            }, [
                                h('img', {
                                    style: {
                                        marginRight: '5px'
                                    },
                                    attrs: {
                                        src: require('@/assets/common/edit.png')
                                    }
                                }),
                                h('span', {
                                    style: {
                                        position: 'relative',
                                        top: '-4px'
                                    }
                                }, '编辑')
                            ])
                        ]);
                    }
                }],
                columns: [],
                columns1: [
                    {
                        title: ' ',
                        width: 40,
                        align: 'center',
                        fixed: 'left',
                        render: (h, params) => {
                            let id = params.row.student_id;
                            let flag = this.currentid === id;
                            let self = this;
                            return h('Radio', {
                                props: {
                                    value: flag
                                },
                                style: {
                                    marginLeft: '8px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    'on-change': () => {
                                        self.currentid = id;
                                        this.currentRow = params.row;
                                    }
                                }
                            });
                        }
                    },
                    {
                        type: 'index',
                        width: 60,
                        fixed: 'left',
                        title: '序号',
                        align: 'center',
                    },
                    {
                        title: '学年',
                        minWidth: 100,
                        key: 'year',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', null, `${params.row.year}-${Number(params.row.year) + 1}`);
                        }
                    },
                    {
                        title: '区域',
                        minWidth: 160,
                        key: 'area_name',
                        align: 'center'
                    },
                    {
                        title: '学校',
                        minWidth: 130,
                        key: 'school_name',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'grade_name',
                        align: 'center'
                    },
                    {
                        title: '班级',
                        width: 100,
                        key: 'class_name',
                        align: 'center'
                    },
                    {
                        title: '学生姓名',
                        width: 100,
                        key: 'student_name',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        width: 60,
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        width: 80,
                        key: 'state',
                        align: 'center',
                        render: (h, params) => {
                            const state = params.row.status;
                            let tmpStr = '';
                            if (state === 1) {
                                tmpStr = '正常';
                            } else if (state === 2) {
                                tmpStr = '异常';
                            } else if (state === 3) {
                                tmpStr = '已核实';
                            } else if (state === 9) {
                                tmpStr = '结束追踪';
                            } else if (state === 10) {
                                tmpStr = '追踪中';
                            }
                            return h('span', {
                                style: {
                                    color: state === 2 ? '#FF7200' : '#000'
                                }
                            }, tmpStr);
                        }
                    }
                ],
                columns2: [
                    {
                        title: '一般',
                        align: 'center',
                        children: [
                            {
                                title: '身高',
                                key: 'height',
                                align: 'center',
                                width: 60,
                            },
                            {
                                title: '体重',
                                key: 'weight',
                                align: 'center',
                                width: 60
                            },
                        ]
                    },
                    {
                        title: '课桌椅型号',
                        width: 62,
                        key: 'desk_mat',
                        align: 'center'
                    },
                    {
                        title: '生理功能',
                        align: 'center',
                        children: [
                            {
                                title: '收缩压',
                                key: 'sp',
                                align: 'center',
                                width: 70,
                            },
                            {
                                title: '舒张压',
                                key: 'dp',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '心率',
                                key: 'pulse',
                                align: 'center',
                                width: 60
                            }
                        ]
                    },
                    {
                        title: '视力',
                        align: 'center',
                        children: [
                            {
                                title: '右眼裸眼视力',
                                key: 'r_eyesight',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '左眼裸眼视力',
                                key: 'l_eyesight',
                                align: 'center',
                                width: 100,
                            },
                            {
                                title: '右眼戴镜视力',
                                key: 'r_bcva',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '左眼戴镜视力',
                                key: 'l_bcva',
                                width: 100,
                                align: 'center',
                            }
                        ]
                    }
                ],
                trendsColumn: [
                    {
                        title: '眼科',
                        align: 'center',
                        children: [
                            {
                                title: '结膜',
                                key: 'jiem',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.jiem);
                                }
                            },
                            {
                                title: '角膜',
                                key: 'jiaom',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.jiaom);
                                }
                            },
                            {
                                title: '晶体',
                                key: 'jt',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.jt);
                                }
                            },
                            {
                                title: '瞳孔',
                                key: 'tk',
                                width: 60,
                                align: 'center',
                                render: (h, params) => {
                                    return this.renderText(h, params.row.tk);
                                }
                            },
                            {
                                title: '眼位',
                                key: 'yw',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.yw);
                                }
                            },
                            {
                                title: '眼球运动',
                                key: 'yqyd',
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.yqyd);
                                }
                            },
                            {
                                title: '异常视觉行为',
                                key: 'ycsjxw',
                                align: 'center',
                                width: 100,
                                // render: (h, params) => {
                                //     let value = params.row.ycsjxw;
                                //     switch (value) {
                                //         case 1:
                                //             return h('span', null, '无');
                                //         case 2:
                                //             return h('span', null, '畏光');
                                //         case 3:
                                //             return h('span', null, '眯眼');
                                //         case 4:
                                //             return h('span', null, '歪头');
                                //         case 5:
                                //             return h('span', null, '其他');
                                //
                                //     }
                                //     return h('span', null, '');
                                // }
                            },
                            {
                                title: '临床印象',
                                key: 'lcyx',
                                align: 'center',
                                minWidth: 100,
                                // render: (h, params) => {
                                //     let value = params.row.lcyx;
                                //     switch (value) {
                                //         case 1:
                                //             return h('span', null, '未见异常');
                                //         case 2:
                                //             return h('span', null, '斜视');
                                //         case 3:
                                //             return h('span', null, '沙眼');
                                //         case 4:
                                //             return h('span', null, '结膜炎');
                                //         case 5:
                                //             return h('span', null, '其他');
                                //
                                //     }
                                //     return h('span', null, '');
                                // }
                            },
                            {
                                title: '戴镜情况',
                                align: 'center',
                                children: [
                                    {
                                        title: '戴镜情况',
                                        key: 'dj',
                                        align: 'center',
                                        width: 100,
                                        render: (h, params) => {
                                            let obj = {
                                                1: '不戴镜*',
                                                2: '佩戴框架眼镜*',
                                                3: '佩戴隐性眼镜*',
                                                4: '佩戴角膜塑形镜*'
                                            };
                                            return h('span', null, obj[params.row.dj]);
                                        }
                                    },
                                    {
                                        title: '戴镜右眼度数(D)',
                                        key: 'dj_r',
                                        align: 'center',
                                        width: 120,
                                    },
                                    {
                                        title: '戴镜左眼度数(D)',
                                        key: 'dj_l',
                                        align: 'center',
                                        width: 120,
                                    }
                                ]
                            },
                            {
                                title: '右眼球镜s(D)',
                                key: 'r_s',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '右眼柱镜c(D)',
                                key: 'r_c',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '右眼轴向值a',
                                key: 'r_a',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '左眼球镜s(D)',
                                key: 'l_s',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '左眼柱镜c(D)',
                                key: 'l_c',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '左眼轴向值a',
                                key: 'l_a',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '屈光临床印象',
                                key: 'diolcyx',
                                align: 'center',
                                width: 100,
                                // render: (h, params) => {
                                //     let value = params.row.diolcyx;
                                //     switch (value) {
                                //         case 1:
                                //             return h('span', null, '未见异常');
                                //         case 2:
                                //             return h('span', null, '近视');
                                //         case 3:
                                //         case 4:
                                //             return h('span', null, '远视');
                                //             return h('span', null, '弱视');
                                //         case 5:
                                //             return h('span', null, '散光');
                                //         case 6:
                                //             return h('span', null, '其他');
                                //
                                //     }
                                //     return h('span', null, '');
                                // }
                            },
                            {
                                title: '角膜曲率半径(mm)*',
                                key: 'jmqlbj',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '眼轴长度(mm)*',
                                key: 'yzcd',
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '色觉*',
                                key: 'sj',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.sj);
                                }
                            },
                            {
                                title: '随访*',
                                key: 'sf',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 100
                            },
                            {
                                title: '转诊*',
                                key: 'zz',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '检查科',
                        align: 'center',
                        children: [
                            {
                                title: '胸部X线检查**',
                                key: 'x_ray',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 100,
                                render: (h, params) => {
                                    let value = params.row.x_ray;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '未见异常');
                                        case 2:
                                            return h('span', null, '异常，' + params.row.description);
                                    }
                                    return h('span', null, '');
                                }
                            }
                        ]
                    },
                    {
                        title: '结核菌素皮肤试验检查',
                        align: 'center',
                        children: [
                            {
                                title: '结核菌素试验**',
                                key: 'result',
                                width: 150,
                                align: 'center',
                                render: (h, params) => {
                                    let value = params.row.result;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '阳性');
                                        case 2:
                                            return h('span', null, '一般阳性');
                                        case 3:
                                            return h('span', null, '中度阳性');
                                        case 4:
                                            return h('span', null, '强阳性');
                                    }
                                    return h('span', null, '');
                                }
                            }
                        ]
                    },
                    {
                        title: '外科',
                        align: 'center',
                        children: [
                            {
                                title: '皮肤',
                                key: 'skin',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 90,
                                render: (h, params) => {
                                    let value = params.row.skin;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '潮红');
                                        case 3:
                                            return h('span', null, '苍白');
                                        case 4:
                                            return h('span', null, '发绀');
                                        case 5:
                                            return h('span', null, '黄染');
                                        case 6:
                                            return h('span', null, '色素沉着');
                                        case 7:
                                            return h('span', null, '湿疹');
                                        case 8:
                                            return h('span', null, '糜烂');
                                        case 9:
                                            return h('span', null, params.row.skin_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '淋巴结',
                                key: 'lymph',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 80,
                                render: (h, params) => {
                                    let value = params.row.lymph;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '未触及');
                                        case 2:
                                            return h('span', null, '锁骨上');
                                        case 3:
                                            return h('span', null, '腋窝');
                                        case 4:
                                            return h('span', null, params.row.lymph_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '头部',
                                key: 'head',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 90,
                                render: (h, params) => {
                                    let value = params.row.head;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '耳郭畸形');
                                        case 3:
                                            return h('span', null, '头部外伤');
                                        case 4:
                                            return h('span', null, params.row.head_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '颈部',
                                key: 'neck',
                                ellipsis: true,
                                tooltip: true,
                                width: 90,
                                align: 'center',
                                render: (h, params) => {
                                    let value = params.row.neck;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '甲状腺肿大');
                                        case 3:
                                            return h('span', null, '颈部外伤');
                                        case 4:
                                            return h('span', null, params.row.neck_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '脊柱',
                                key: 'spine',
                                ellipsis: true,
                                tooltip: true,
                                width: 90,
                                align: 'center',
                                render: (h, params) => {
                                    let value = params.row.spine;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '脊柱侧弯');
                                        case 3:
                                            return h('span', null, '脊柱矫正中');
                                        case 4:
                                            return h('span', null, '脊柱术后');
                                        case 5:
                                            return h('span', null, '脊柱呈S形');
                                        case 6:
                                            return h('span', null, '脊柱后凸');
                                        case 7:
                                            return h('span', null, params.row.spine_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '四肢',
                                key: 'legs',
                                width: 90,
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                render: (h, params) => {
                                    let value = params.row.legs;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '骨折');
                                        case 3:
                                            return h('span', null, '先天畸形');
                                        case 4:
                                            return h('span', null, '扁平足');
                                        case 5:
                                            return h('span', null, '跛行');
                                        case 6:
                                            return h('span', null, params.row.legs_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '胸部',
                                key: 'throax',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 60,
                                render: (h, params) => {
                                    let value = params.row.throax;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '桶装胸');
                                        case 3:
                                            return h('span', null, '扁平胸');
                                        case 4:
                                            return h('span', null, '鸡胸');
                                        case 5:
                                            return h('span', null, '漏斗胸');
                                        case 6:
                                            return h('span', null, params.row.throax_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '其他记录*',
                                key: 'other',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 80
                            }
                        ]
                    },
                    {
                        title: '内科',
                        align: 'center',
                        children: [
                            {
                                title: '近期不适症状',
                                key: 'recent_unwell',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 100
                            },
                            {
                                title: '其他症状*',
                                key: 'other_unwell',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 100
                            },
                            {
                                title: '心',
                                key: 'heart',
                                align: 'center',
                                ellipsis: true,
                                tooltip: true,
                                width: 80,
                                render: (h, params) => {
                                    let value = params.row.heart;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '心脏杂音');
                                        case 3:
                                            return h('span', null, '心律不齐');
                                        case 4:
                                            return h('span', null, params.row.heart_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '肺',
                                key: 'lung',
                                width: 80,
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                render: (h, params) => {
                                    let value = params.row.lung;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '哮鸣声');
                                        case 3:
                                            return h('span', null, '干啰音');
                                        case 4:
                                            return h('span', null, '湿啰音');
                                        case 5:
                                            return h('span', null, params.row.lung_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '肝',
                                key: 'liver',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    let value = params.row.liver;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '肝肿大');
                                        case 3:
                                            return h('span', null, '肝区压痛');
                                        case 4:
                                            return h('span', null, params.row.liver_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '脾',
                                key: 'spleen',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 80,
                                render: (h, params) => {
                                    let value = params.row.spleen;
                                    switch (value) {
                                        case 1:
                                            return h('span', null, '正常');
                                        case 2:
                                            return h('span', null, '脾肿大');
                                        case 3:
                                            return h('span', null, '脾区压痛');
                                        case 4:
                                            return h('span', null, params.row.spleen_str);
                                    }
                                    return h('span', null, '');
                                }
                            },
                            {
                                title: '其他记录*',
                                key: 'other_record',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 100
                            }
                        ]
                    },
                    {
                        title: '检验科',
                        align: 'center',
                        children: [
                            {
                                title: '肝功能ALT(U/L)**',
                                key: 'alt',
                                align: 'center',
                                width: 120
                            },
                            {
                                title: '肝功能TBIL(umol/L)**',
                                key: 'tbil',
                                align: 'center',
                                width: 140,
                            },
                            {
                                title: '血红蛋白(g/L)**',
                                key: 'hemoglobin',
                                align: 'center',
                                width: 110
                            },
                            {
                                title: '其他化验结果*',
                                key: 'other_clinical',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 120
                            }
                        ]
                    },
                    {
                        title: '口腔科',
                        align: 'center',
                        children: [
                            {
                                title: '齿列',
                                key: 'dentition ',
                                align: 'center',
                                width: 60,
                                render: (h, params) => {
                                    return h('span', null, params.row.dentition === 1 ? '整齐' : '不齐');
                                }
                            },
                            {
                                title: '牙周',
                                key: 'periodontal',
                                align: 'center',
                                width: 100,
                                render: (h, params) => {
                                    return this.renderText(h, params.row.periodontal);
                                }
                            },
                            {
                                title: '有无龋齿（无/有）',
                                key: 'decayed_tooth ',
                                align: 'center',
                                width: 130,
                                render: (h, params) => {
                                    return h('span', null, params.row.decayed_tooth === 1 ? '有' : '无');
                                }
                            },
                            {
                                title: '龋患恒牙',
                                key: 'he_broken',
                                width: 80,
                                align: 'center'
                            },
                            {
                                title: '龋患乳牙',
                                key: 'ru_broken',
                                width: 80,
                                align: 'center'
                            },
                            {
                                title: '龋失恒牙',
                                key: 'he_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋失乳牙',
                                key: 'ru_lose',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补恒牙',
                                key: 'he_repair',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '龋补乳牙',
                                key: 'ru_repair',
                                align: 'center',
                                width: 70
                            },
                            {
                                title: '其他记录*',
                                key: 'remark',
                                ellipsis: true,
                                tooltip: true,
                                align: 'center',
                                width: 100
                            }
                        ]
                    }
                ],
                yearList: yearLists().reverse(),
                areaList1: [],
                areaList: [],
                schoolList: [],
                gradeList: [],
                classList: [],
                modalTitle: '',
                flag: false,
                id: '',
                com: null,
                planCode: null,
                year: null,
                studentCode: null,
                student_id: null,
                pageConfig: {
                    page: 1,
                    size: 15,
                    total: 0,
                    opts: [15, 20, 50, 100]
                },
                propSelection: [],
                is_manage: true
            };
        },
        methods: {
            renderText(h, value) {
                if (value === 1) {
                    return h('span', null, '正常');
                } else if (value === 2) {
                    return h('span', null, '异常');
                }
                return h('span', null, '');
            },
            getCode(e) {
                this.req.code = e.code;
            },
            getSelectCondition() {
                /// ===========获取下拉列表查询条件
                Promise.all([
                    // 区域列表
                    this.$ajax({
                        url: urls.area_all_list,
                        data: {}
                    }),
                    // 体检项目
                    this.$ajax({
                        url: urls.sets_list,
                        data: {}
                    }),
                    // 学校
                    this.$ajax({
                        url: urls.dept_all_list,
                        data: {}
                    })
                ]).then(([value1, value2, value3]) => {
                    let data1 = value1.data || [];
                    this.areaList = data1.filter(item => item.type === 2);

                    this.propSelection = value2.data || [];

                    let data3 = value3.data || [];
                    this.schoolList = data3.filter((item) => item.type === 2);
                    if (!this.is_manage) {
                        this.schoolChange(this.req.dep_id);
                    }
                });
            },
            schoolChange(value) {
                this.req.grade_no = '-1';
                this.req.class_no = '-1';
                this.classList = [];
                if (value === '-1') {
                    this.gradeList = [];
                    return;
                }
                let temp = this.schoolList.filter(item => item.id === value);
                if (!temp.length) {
                    return false;
                }
                /// =========== 所属年级
                this.$ajax({
                    url: urls.grade_no_list,
                    data: {
                        garde: temp[0].nature
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(err => {
                    this.gradeList = [];
                });
            },
            gradeChange(value) {
                this.req.class_no = '-1';
                if (value === '-1') {
                    this.classList = [];
                    return;
                }
                this.$ajax({
                    url: urls.class_all_lists,
                    data: {
                        dep_id: this.req.dep_id,
                        grade_no: value
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.classList = data.data;
                    } else {
                        this.classList = [];
                    }
                });
            },
            // 获取区级城市
            areaChange(value) {
                this.req.area_id2 = '-1';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter(function (item) {
                            return item.type === 3 && item.pid === value;
                        });
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            // 查询
            initSearch() {
                this.pageConfig.page = 1;
                this.search();
            },
            // 列表数据
            search() {
                const {year, area_id1, area_id2, dep_id, grade_no, class_no, student_name, status} = this.req;
                let {code, prop_id} = this.req;
                if (prop_id === '-1') {
                    this.columns = [...this.columns1, ...this.columns2, ...this.columnsFoot];
                    prop_id = '8EE7B19DFAC74C7E898E983785800A0A';
                    code = 'PHYSICAL_EXAM_RECORD';
                } else if (prop_id === 'a6efcc860d76449ab45de28bf128f769') { // 眼科
                    code = 'NEWOPHTHALMOLOGY';
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(0, 1), ...this.columnsFoot];
                } else if (prop_id === 'd1477eb2c08546c98bc46d71ede96c65') { // 检查科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(1, 2), ...this.columnsFoot];
                } else if (prop_id === 'e0449ee79436491d9ae149287c023efe') { /// "结核菌素皮肤试验检查"
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(2, 3), ...this.columnsFoot];
                } else if (prop_id === '7c59edca1a434725b9b11702876858b3') { // 外科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(3, 4), ...this.columnsFoot];
                } else if (prop_id === 'f8845b0393d64726a9cc269d25ded5fd') { // 内科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(4, 5), ...this.columnsFoot];
                } else if (prop_id === 'd56fcfc34fa94d99a4e3ea5ce775a1f7') { // 检验科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(5, 6), ...this.columnsFoot];
                } else if (prop_id === 'b8b0af7f6dab499281ceb9dc31ff2dcb') { // 口腔科
                    this.columns = [...this.columns1, ...this.trendsColumn.slice(6, 7), ...this.columnsFoot];
                }
                // else if (prop_id === '424095301EF0DCE4474A443A607AD19D') { // 胸围
                //     this.columns = [...this.columns1, ...this.trendsColumn.slice(7, 8), ...this.columnsFoot];
                // }
                const {page, size} = this.pageConfig;
                this.$ajax({
                    url: urls.follow_list,
                    data: {
                        page: page,
                        size: size,
                        year: year,
                        area_pid: area_id1 === '-1' ? null : area_id1,
                        area_id: area_id2 === '-1' ? null : area_id2,
                        dep_id: dep_id === '-1' ? null : dep_id,
                        set_id: prop_id,
                        grade_no: grade_no === '-1' ? null : grade_no,
                        class_name: class_no === '-1' ? null : class_no,
                        code: code,
                        student_name: student_name ? student_name : null,
                        status: status === '-1' ? null : status
                    }
                }).then(data => {
                    this.loading = false;
                    if (data.code === 200) {
                        this.tableData = data.data;
                        this.pageConfig.total = data.totalRecords;
                    } else {
                        this.tableData = [];
                        this.pageConfig.total = 0;
                    }
                }).catch(err => {
                    window.console.log(err);
                    this.tableData = [];
                });
            },
            // 打印
            prints() {
                if (this.currentRow.student_id === this.currentid) {
                    this.planCode = this.currentRow.plan_code;
                    this.year = this.currentRow.year;
                    this.studentCode = this.currentRow.student_code;
                    this.student_id = this.currentRow.student_id;
                    this.flag = true;
                    this.modalTitle = '打印';
                    this.status = this.currentRow.status;
                    this.com = Print;
                } else {
                    this.$Message.error('请选择要打印的报告');
                }
            },
            edit(row) {
                this.student_id = row.student_id;
                this.flag = true;
                this.modalTitle = '学生健康体检复测';
                this.status = row.status;
                this.com = Edit;
            },
            infos(row) {
                this.student_id = row.student_id;
                this.flag = true;
                this.status = row.status;
                this.modalTitle = '升学体检报告详情';
                this.com = Info;
            },
            // 分页
            pageChange(page) {
                this.pageConfig.page = page;
                this.search();
            },
            sizeChange(size) {
                this.pageConfig.size = size;
                if (this.pageConfig.page === 1) {
                    this.pageChange(1);
                }
            },
            ModalClose(flag) {
                this.com = null;
                if (flag) {
                    this.search();
                }
            },
        },
        created() {
            let code = sessionStorage.getItem('roleCode');
            if (code !== '999' && code !== '10100001' && code !== '10200001' && code !== '10202001' && code !== '10204001') { // 管理员, 教育局
                this.is_manage = false;
                this.req.dep_id = sessionStorage.getItem('dep_id');
            }
            this.getSelectCondition();
            this.search();
        }
    };
</script>
<style lang="less">
    .reportList {
        thead {
            .ivu-table-cell {
                font-size: 14px !important;
            }
        }
    }

    .personSummaryReport-container {
        overflow: auto;
        // float: left;
        padding-left: 16px;

        .report-value-content {
            position: relative;
            padding-top: 10px;
            color: #000000;
            font-size: 14px;

            .qgInfo {
                float: left;
                margin-left: 8px;
                margin-top: -6px;

                .report-value {
                    span {
                        margin-right: 6px;
                        font-weight: normal;
                    }
                }
            }
        }

        .normal {
            font-weight: 600;
        }

        .report-error {
            font-size: 16px;
            color: #ed5145;
        }

        .report-normal {
            font-size: 16px;
            color: #299E97;
        }

    }

    .anaysisModal {
        .ivu-modal-body {
            padding-bottom: 32px !important;
        }
    }

    .ivu-tooltip, .ivu-tooltip-rel {
        display: inline-block;
        vertical-align: middle !important;
    }

</style>

