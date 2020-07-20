<template>
    <div class="projectPlanNew">
        <div class="content-box clearfix">
            <div class="title">
                监测项目规划
            </div>
            <Form inline style="margin-top: 34px;">
            </Form>
            <div class="divider"></div>
            <BaseTable
                    ref="myTable"
                    :columns="columns"
                    :data="data"
                    :loading="loading"
                    border
            ></BaseTable>

        </div>

    </div>
</template>
<script>
    // import Vue from 'vue';
    import urls from '@/service/Urls';

    export default {
        data() {
            return {
                loading: true,
                columns: [
                    {
                        title: '监测项目',
                        width: 200,
                        align: 'center',
                        key: 'monitor'
                    },
                    {
                        title: '小学',
                        align: 'center',
                        children: [
                            {
                                title: '7',
                                key: '7',
                                align: 'center',
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data['0'].necessary === 1,
                                                disabled: params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[0].necessary, params.row.data[0].id, '7');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                                // width: 200,
                            },
                            {
                                title: '8',
                                key: '8',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[1].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[1].necessary, params.row.data[1].id, '8');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '9',
                                key: '9',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[2].necessary === 1
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[2].necessary, params.row.data[2].id, '9');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '10',
                                key: '10',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[3].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96'
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[3].necessary, params.row.data[3].id, '10');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '11',
                                key: '11',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[4].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96' ? true : false
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[4].necessary, params.row.data[4].id, '11');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                        ]

                    },
                    {
                        title: '中学',
                        align: 'center',
                        children: [
                            {
                                title: '12',
                                key: '12',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[5].necessary === 1
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[5].necessary, params.row.data[5].id, '12');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '13',
                                key: '13',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[6].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96' ? true : false
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[6].necessary, params.row.data[6].id, '13');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '14',
                                key: '14',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[7].necessary === 1
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[7].necessary, params.row.data[7].id, '14');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '15',
                                key: '15',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[8].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96' ? true : false
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[8].necessary, params.row.data[8].id, '15');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '16',
                                key: '16',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[9].necessary === 1,
                                                disabled: params.row.id === '11C5EB39EBA34971ABE9C2109A91E508' || params.row.id === '7701F78D1DFB4D83AE4072FC87C4BE96' ? true : false
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[9].necessary, params.row.data[9].id, '16');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                            {
                                title: '17',
                                key: '17',
                                align: 'center',
                                // width: 200,
                                render: (h, params) => {
                                    return h('div', [
                                        h('Checkbox', {
                                            props: {
                                                type: 'primary',
                                                value: params.row.data[10].necessary === 1
                                            },
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {
                                                'on-change': () => {
                                                    this.checkedChange(params.row.data[10].necessary, params.row.data[10].id, '17');
                                                }
                                            }
                                        }),
                                    ]);
                                }
                            },
                        ]

                    },
                ],
                data: [
                    // {
                    //     monitor: '',
                    //     id: '',
                    //     data: [
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //         {id: '', age: '', necessary: 1},
                    //     ]
                    // }
                ],
            };
        },
        methods: {
            renderCheckbox(params, id, gender){
                return h('div', [
                    h('Checkbox', {
                        props: {
                            type: 'primary',
                            value: params.row.data['0'].necessary === 1,
                            disabled: params.row.id === id ? true : false
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            'on-change': () => {
                                this.checkedChange(params.row.data[0].necessary, params.row.data[0].id, gender);
                            }
                        }
                    }),
                ]);
            },
            // 是否监测
            checkedChange(status, id, _age) {
                status = status === 1 ? 2 : 1;
                this
                    .$ajax({
                        url: urls.monitorProject_update,
                        data: {
                            id: id,
                            necessary: status
                        }
                    })
                    .then(data => {
                        if (data.code === 200) {
                            this.data.forEach(item => {
                                item.data.forEach(v => {
                                    if (v.id === id) {
                                        v.necessary = status
                                    }
                                })
                            })
                            // this.getMonitorProjectList();
                            this.$Message.success(data.result);
                        } else {
                            this.$Message.error(data.error);
                        }
                    });

            },
            // 获取项目规划列表
            getMonitorProjectList() {
                this.$ajax({
                    url: urls.monitorProject_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.loading = false;
                        let res = data.data;
                        var tmp = [];

                        res.forEach((v) => {
                            let obj1 = {
                                monitor: v.name,
                                id: v.id,
                                data: []
                            };
                            v.monSetPlansBeans.forEach(item => {
                                obj1.data.push({
                                    id: item.id,
                                    age: item.age,
                                    necessary: item.necessary
                                })
                            })
                            tmp.push(obj1)

                        })
                        this.data = tmp;
                        //表格底部展示项
                        if (this.$refs.myTable) {
                            this.$nextTick(() => {
                                var element = this.$refs.myTable.$el.querySelector('tbody.ivu-table-tbody');
                                var req = {
                                    content: '小学四年级以上进行该项问卷调查',
                                    content2: '结论'
                                }
                                let createNode = function (project, content) {
                                    var para = document.createElement(`tr`);
                                    para.setAttribute("class", "ivu-table-row");
                                    para.innerHTML = `<td class="ivu-table-column-center">
                                                       <div class="ivu-table-cell">
                                                           <span>${project}</span>
                                                       </div>
                                                   </td>
                                                   <td class="ivu-table-column-center" colspan="11">
                                                       <div class="ivu-table-cell">
                                                           <span>${content}</span>
                                                       </div>
                                                   </td>`
                                    return para
                                }
                                //  女生
                                element.appendChild(createNode('月经初期', '女生'));
                                // element = this.$refs.myTable.$el.querySelector('tbody.ivu-table-tbody')

                                //   男生
                                element.appendChild(createNode('首次遗精', '男生'));
                                // element = this.$refs.myTable.$el.querySelector('tbody.ivu-table-tbody')
                                //   问卷调查
                                element.appendChild(createNode('问卷调查', req.content));
                                // element = this.$refs.myTable.$el.querySelector('tbody.ivu-table-tbody')
                                //   主检
                                element.appendChild(createNode('主检', req.content2));
                            })

                        }

                    } else {
                        this.data = []
                    }


                });
            },
        },
        created() {
            this.getMonitorProjectList()
        }
    };

</script>
<style lang="scss">
    .projectPlanNew {
        .v-table-header {
            font-size: 14px;
            color: #FFF;

        }

        .content-box {
            .ivu-form {
                position: relative;
                z-index: 100;
            }

            .submit-btn {
                background-color: #FF7B10;
                color: #FEFEFE
            }
        }

        .ivu-table-cell .ivu-checkbox-inner {
            border-radius: 5px;
        }
    }

    .myownChecked {
        width: 16px;
        height: 16px;
        cursor: pointer;
        padding: 0;
    }

    .ivu-checkbox-disabled {
        .ivu-checkbox-inner {
            background: transparent;
            border: 0 none;
        }
    }
</style>

