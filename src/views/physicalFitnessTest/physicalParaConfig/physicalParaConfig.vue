<template>
    <div class="content-box">
        <div class="title">体测项目参数配置</div>
        <BaseTable :columns="columns" :data="tableData" :modalFlag="false"></BaseTable>
        <component :is='com' :row='row' :label="label" @modal-close='ModalClose'></component>
    </div>
</template>
<script>
    import Urls from '@/service/Urls';
    import EditConfig from './editConfig'

    export default {
        name: 'physicalParaConfig',
        data() {
            return {
                columns: [
                    {
                        title: ' ',
                        width: 100
                    },
                    {
                        title: '体测项',
                        key: 'name',
                    },
                    {
                        title: '结果数据',
                        render: (h, params) => {
                            const temp = params.row.content.split('@');
                            return h('div', null, [h('p', null, temp[0]), h('p', null, temp[1])]);
                        },
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        render: (h, params) => {
                            let dis = 'none';
                            //引体向上  一分钟仰卧起坐  一分钟跳绳    800米跑     1000米跑
                            if(params.row.id === '88ED8DA7E639489ABEF0306951A8BDC9'||params.row.id === '1CFEB456E8744B9E9AA42B2BAAF57A4D'
                                ||params.row.id === '257B4D2B6D934C24A880891207795B2A'||params.row.id === '6E40F3C06491405AAEBBCDB39FB43AD2'
                                ||params.row.id === '84940DA547A944FEB7935D28D52A5803'){
                                dis = 'inline-block'
                            }

                            return h('div', [
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 1);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/medicalExamination/reference_normal.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '逻辑检验界值')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 2);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/medicalExamination/reference_retest.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '复测参考值')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 3);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/standard_score.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '得分标准')
                                ]),
                                h('span', {
                                    attrs: {
                                        class: 'editBtn'
                                    },
                                    style: {
                                        display: dis,
                                        marginRight: '0'
                                    },
                                    on: {
                                        click: () => {
                                            this.operate(params.row, 4);
                                        }
                                    }
                                }, [
                                    h('img', {
                                        style: {
                                            marginRight: '4px'
                                        },
                                        attrs: {
                                            src: require('@/assets/common/awarded_marks.png')
                                        }
                                    }),
                                    h('span', {
                                        style: {
                                            position: 'relative',
                                            top: '-4px'
                                        }
                                    }, '加分标准')
                                ]),
                            ]);
                        }
                    }],
                tableData: [],
                com: null,
                row: null,
                label: null
            };
        },
        methods: {
            search() {
                this.$ajax({
                    url: Urls.elecPhysical_Para_list,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(() => {
                    this.$Message.error('获取列表失败，请重试');
                });

            },
            operate(row, label) {
                this.label = label;
                this.row = row;
                this.com = EditConfig
            },
            ModalClose() {
                this.com = null
            }
        },
        mounted() {
            this.search();
        }
    };
</script>

<style lang="less">

</style>
