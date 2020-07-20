<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="testPlanModal1"
                :mask-closable="false"
                @on-cancel="close"
        >
            <div class="edit clearfix">
                <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                    <FormItem v-if="disabled" label="监测学年" style="width: 300px;margin-right: 90px!important">
                        <i-select style="width:300px" v-model="obj.year" :disabled="disabled">
                            <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem v-else label="监测学年" prop="year" style="width: 300px;margin-right: 90px!important">
                        <i-select style="width:300px" v-model="obj.year" :disabled="disabled">
                            <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem v-if="disabled" label="监测队伍名称" style="width: 300px;margin-right: 0!important">
                        <i-input v-model="obj.teamName" @on-change="nameChange" :disabled="disabled"></i-input>
                    </FormItem>
                    <FormItem v-else label="监测队伍名称" prop="teamName" style="width: 300px;margin-right: 0!important">
                        <i-input v-model="obj.teamName" @on-change="nameChange" :disabled="disabled"></i-input>
                    </FormItem>
                </Form>
            </div>
            <i-table center :disabled-hover='true' size="small" :height="400" :columns="columns"
                     :data="tableData"></i-table>

            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {yearLists,todayYear} from "@/libs/dateUtils";

    export default {
        name: 'addTestPlan',
        props: ['id', 'title', 'flag', 'isEdit'],
        data() {
            return {
                obj: {
                    year: todayYear(),
                    teamName: ''
                },
                yearList: [],
                sname: [],//监测人员下拉框
                rules: {
                    year: [{required: true, message: '请选择监测学年', trigger: 'change'}],
                    teamName: [{required: true, message: '请输入队伍名称', trigger: 'blur'}],
                },
                columns: [],
                // 编辑页表头
                columns1: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '监测项目',
                        key: 'set_name',
                    },
                    {
                        title: '监测人员',
                        key: 'sname',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        transfer: true,
                                        multiple: true,
                                        value: params.row.staff_id
                                    },
                                    on: {
                                        'on-change': (value) => {
                                            this.selectChange(params.row.id, value, params['index']);
                                        }
                                    },
                                },
                                params.row.sname.map(function (type) {
                                    return h('Option', {
                                        props: {
                                            value: type.id
                                        }
                                    }, type.name);
                                })
                            );
                        },
                    }
                ],
                staff_ids: [],//监测人员id
                // 详情页表头
                columns2: [
                    {
                        title: ' ',
                        width: 40
                    },
                    {
                        type: 'index',
                        title: '序号',
                        width: 120
                    },
                    {
                        title: '监测项目',
                        key: 'set_name'
                    },
                    // {
                    //     title: '所属单位',
                    //     key: 'dep_name'
                    // },
                    {
                        title: '体检医生',
                        key: 'sname'
                    }
                ],
                tableData: [],//表格数据
                disabled: false,
                Team_objs: []
            };
        },
        methods: {
            selectChange(id, v, i) {
                var this_1 = this;
                this.staff_ids = [];
                this.staff_ids = v;
                this.Team_objs.filter(item => {
                    if (item.id === id) {
                        item.sname = null;
                        item.staff_id = [];
                        item.staff_id = v;
                    }
                });
                // console.log(i)
            },
            delete(index) {
                this.tableData.splice(index, 1);
            },
            // 提交保存
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }

                    if (!this.tableData.length) {
                        this.$Message.error('请维护体测对象');
                        return false;
                    }
                    let data = {};
                    data.TeamInfo = {
                        year: this.obj.year,
                        name: this.obj.teamName
                    };
                    if (this.id) {
                        data.TeamInfo.id = this.id;
                        data.Team_objs = this.Team_objs.map(item => {
                            let items = {};
                            if (item.id) {
                                items.set_id = item.id;
                            }
                            items.set_name = item.set_name;
                            items.staff_id = (item.staff_id).join(',');

                            return items;
                        });
                        let _f = data.Team_objs.every(item => {

                            return item.staff_id.length !== 0;
                        });
                        if (!_f) {
                            this.$Message.error('请为每个监测项目配置人员');

                            return;
                        }
                        // 编辑
                        this.$ajax({
                            url: urls.monitorTeam_update,
                            data: data
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('修改' + data.code + '监测队伍成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else {
                        data.Team_objs = this.Team_objs.map(item => {
                            let items = {};
                            if (item.id) {
                                items.set_id = item.id;
                            }
                            items.set_name = item.set_name;
                            items.staff_id = (item.staff_id).join(',');

                            return items;
                        });
                        let _flag = data.Team_objs.every(item => {

                            return item.staff_id.length !== 0;
                        });
                        if (_flag) {
                            // 新增
                            this.$ajax({
                                url: urls.monitorTeam_add,
                                data: data
                            }).then(json => {
                                if (json.code === 200) {
                                    this.$Message.success('新增监测队伍成功');
                                    this.$emit('modal-close', true);
                                } else {
                                    this.$Message.error(json.error);
                                }
                            }).catch(err => {
                                window.console.log(err);
                            });
                        } else {
                            this.$Message.error('请为每个监测项目配置人员');
                            return;
                        }
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            },
            // 监测年份
            dateChange(value, dateType) {
                this.obj.year = value;
            },
            // 监测队伍名称
            nameChange(event) {
                // this.obj.teamName = event.data
            },
            //详情列表数据
            search() {
                this.$ajax({
                    url: urls.monitorTeam_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            code: data.data.code,
                            year: data.data.year,
                            teamName: data.data.name
                        };
                        this.tableData = data.data.objs;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            // 新增列表数据
            getAddListDatas() {
                let _this = this;
                Promise.all([
                    this.$ajax({
                        url: urls.monitorTeam_staff,
                        data: {}
                    }),
                    this.$ajax({
                        url: urls.monitorTeam_set_name,
                        data: {}
                    })
                ]).then(res => {
                    _this.sname = res[0].data.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        };
                    });
                    _this.tableData = res[1].data.map(item => {
                        return {
                            set_name: item.name,
                            id: item.id,
                            sname: _this.sname,
                            staff_id: _this.staff_ids
                        };
                    });
                    _this.tableData.unshift({
                        set_name: '登记到场',
                        id: '109A91E50871453BB016BD8DF02AA1FD',
                        sname: _this.sname,
                        staff_id: _this.staff_ids
                    });
                    this.Team_objs = JSON.parse(JSON.stringify(_this.tableData));
                });
            },
            // 编辑列表数据
            getDetailList() {
                let _this = this;
                // 获取监测人员
                const p2 = new Promise((resolve, reject) => {
                    this.$ajax({
                        url: urls.monitorTeam_info,
                        data: {
                            id: _this.id
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            resolve(data);
                        }
                    }).catch(err => {
                        reject(err);
                    });

                });
                const p1 = new Promise((resolve, reject) => {
                    this.$ajax({
                        url: urls.monitorTeam_staff,
                        data: {
                            name: ''
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            resolve(data);
                        }
                    }).catch(err => {
                        reject(err);
                    });

                });
                Promise.all([p1, p2]).then(res => {
                    _this.sname = res[0].data.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        };
                    });
                    _this.obj = {
                        // code: res[1].data.code,
                        year: res[1].data.year,
                        teamName: res[1].data.name
                    };
                    _this.tableData = res[1].data.objs.map(item => {
                        return {
                            set_name: item.set_name,
                            id: item.set_id,
                            sname: _this.sname,
                            staff_id: item.staff_id.split(',')
                        };
                    });

                    _this.Team_objs = JSON.parse(JSON.stringify(_this.tableData));
                });
            }
        },
        created() {
            this.yearList = yearLists().reverse();
            this.disabled = !!this.flag;
            if (!this.disabled) {
                this.columns = this.columns1;
            } else {
                this.columns = this.columns2;
            }
            if (this.id) { //编辑
                if (this.isEdit === true) {
                    this.getDetailList();

                } else {//详情
                    this.search();
                }

            } else {//新增
                this.getAddListDatas();
            }
        }
    };
</script>
<style lang="less">
    .testPlanModal1 {
        .ivu-modal-body {
            padding: 18px 28px;
            // overflow-y: auto;
            .ivu-form-item-label {
                color: #333 !important;
            }

            .ivu-table-wrapper {
                overflow: visible
            }
        }

        .img {
            /*width: 104px;*/

            img {
                display: block;
                width: 100%;
            }
        }

        .ivu-upload {
            display: block !important;
            width: 100% !important;
            padding: 6px 10px;
            text-align: center;
            cursor: pointer;
        }

        .addschool {
            display: inline-block;
            margin-bottom: 12px;
            cursor: pointer;

            &:hover {
                opacity: 0.8;
            }

            img {
                position: relative;
                top: 5px
            }
        }

        .ivu-form-item {
            margin-right: 0 !important;
        }

        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .ivu-table td, .ivu-table th {
            height: 36px;
        }

        .delete {
            display: inline-block;
            color: #FF7200;
            padding: 4px 8px;
            cursor: pointer;
        }

        .delete:hover {
            background: ghostwhite;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }

    .studentModal2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .close {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(128, 128, 128);
            background: rgb(255, 255, 255);
            border: 1px solid rgb(173, 173, 173);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            width: 70px;
            height: 30px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgb(255, 255, 255);
            background: rgb(255, 114, 0);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
</style>

