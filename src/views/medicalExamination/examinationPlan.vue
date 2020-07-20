<template>
    <div class="examinationPlan">
        <div class="content-box">
            <div class="title">
                体检项目规划
            </div>
            <v-table
                :is-horizontal-resize="true"
                :is-vertical-resize="true"
                style="width:100%"
                :height="tableHeight"
                :title-row-height="40"
                :row-height="48"
                ref="table"
                title-bg-color="#498E8A"
                :columns="columns"
                :table-data="tableData"
                :cell-merge="cellMerge"
                :title-rows="titleRows"
                @on-custom-comp="customCompFunc"
            ></v-table>
        </div>
    </div>
</template>
<script>
    import {getexaminationPlan} from './table_Data';
    import urls from '@/service/Urls';

    export default {
        name: 'examinationPlan',
        data() {
            return {
                tableHeight: 500,
                selectData: [],
                check: false,
                titleRows: [
                    [
                        {fields: ['department'], title: '体检科室', titleAlign: 'left'},
                        {fields: ['itemType', 'item'], title: '体检项', titleAlign: 'left', colspan: 2},
                        {fields: ['healthy'], title: '健康体检', titleAlign: 'left'},
                        {fields: ['highSchool'], title: '升学体检', titleAlign: 'left'},
                    ]
                ],
                tableData: [],
                columns: [
                    {
                        field: 'department',
                        width: 160,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'itemType',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'item',
                        width: 100,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'healthy',
                        title: '健康体检',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'highSchool',
                        title: '升学体检',
                        width: 100,
                        columnAlign: 'center',
                        isResize: true
                    }
                ]
            };
        },
        methods: {
            //设置table选中
            search() {
                this.$ajax({
                    url: urls.medicaltype_tree,
                    data: {}
                }).then((data) => {
                    if (data.code === 200) {
                        let items = this.recusion(data.data);
                        this.tableData = getexaminationPlan.map((olda) => {
                            for (let i = 0; i < items.length; i++) {
                                if (olda.id === items[i].id) {
                                    let col1 = '';
                                    if (olda['col1']) {
                                        col1 = olda['col1'];
                                    }

                                    let col2 = '';
                                    if (olda['col2']) {
                                        col2 = olda['col2'];
                                    }
                                    let col3 = '';
                                    if (olda['col3']) {
                                        col3 = olda['col3'];
                                    }
                                    return {
                                        department: olda.department,
                                        itemType: olda.itemType,
                                        item: olda.item,
                                        id: olda.id,
                                        is_true: items[i].is_true,
                                        is_health: items[i].is_health,
                                        is_upper: items[i].is_upper,
                                        col1: col1,
                                        col2: col2,
                                        col3: col3
                                    };
                                }
                            }
                            return olda;
                        });
                    } else {
                        this.tableData = getexaminationPlan;
                    }
                }).catch(() => {
                    this.tableData = getexaminationPlan;
                });
            },
            recusion(data) {
                let items = [];

                function recu(datas) {
                    datas.map(item => {
                        if (item.children && item.children.length) {
                            recu(item.children);
                            items.push({
                                id: item.id,
                                is_true: item.is_true,
                                is_health: item.is_health,
                                is_upper: item.is_upper
                            });
                        } else {
                            items.push({
                                id: item.id,
                                is_true: item.is_true,
                                is_health: item.is_health,
                                is_upper: item.is_upper
                            });
                        }
                    });
                }

                recu(data);
                return items;
            },
            highschool() {
                let params = {
                    type: 'highschool',
                    index: this.index,
                    rowData: this.rowData,
                    selectData: this.selectData
                };
                this.$emit('on-custom-comp', params);
            },
            //选中
            customCompFunc(params) {
                //健康体检选中
                let data = {};
                if (params.type === 'health') { // do edit operation
                    data = {
                        set_name: params.rowData.itemType,
                        set_id: params.rowData.id,
                        is_health: params.check ? 1 : 0
                    };
                }
                //升学体检选中
                if (params.type === 'highSchool') { // do edit operation
                    data = {
                        set_name: params.rowData.itemType,
                        set_id: params.rowData.id,
                        is_upper: params.check ? 1 : 0
                    };
                }
                this.$ajax({
                    url: urls.medicaltype_edit,
                    data: data
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success(data.result);
                        this.search();
                    } else {
                        this.$Message.error('勾选失败，请重试');
                    }
                }).catch(err => {
                    console.log(90);
                });
            },
            cellMerge(rowIndex, rowData, field) {
                //合并第一列
                if (field === 'department') {
                    if (rowData['col1']) {
                        return {
                            colSpan: rowData['col1'].col,
                            rowSpan: rowData['col1'].row,
                            content: rowData.department
                        };
                    }
                }
                //合并第二列
                if (field === 'itemType') {
                    if (rowData['col2']) {
                        return {
                            colSpan: rowData['col2'].col,
                            rowSpan: rowData['col2'].row,
                            content: rowData.itemType
                        };
                    }
                }
                //合并健康体检
                if (field === 'healthy') {
                    if (rowData['col3']) {
                        return {
                            colSpan: rowData['col3'].col,
                            rowSpan: rowData['col3'].row,
                            componentName: 'health-checkbox'
                        };
                    }
                }

                //合并升学体检
                if (field === 'highSchool') {
                    if (rowData['col3']) {
                        return {
                            colSpan: rowData['col3'].col,
                            rowSpan: rowData['col3'].row,
                            componentName: 'school-checkbox'
                        };
                    }
                }
            }
        },
        mounted() {
            this.search();
            let that = this;
            window.onresize = function () {
                try {
                    that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 180;
                    that.$refs.table.resize();
                    console.log(90);
                } catch (e) {
                }
            };
            that.tableHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 180;
            that.$refs.table.resize();
        },
        beforeDestroy() {
            window.onresize = null;
        },
        created() {

        }
    };

</script>
<style lang='scss'>
    .examinationPlan {
        .v-table-title-cell,
        .v-table-body-cell {
            padding-left: 10px !important;
        }

        .v-table-rightview-special-border td:last-child .v-table-body-cell {
            border-right-width: 1px !important;
        }

        .v-table-title-class {
            font-size: 16px;
            color: #FFFFFF;
        }

        .v-table-body-class {
            font-size: 16px;
        }

        /*设置表格样式时，style标签不能设置scoped*/
        .column-cell {
            background-color: #ffffff;
        }
    }
</style>
