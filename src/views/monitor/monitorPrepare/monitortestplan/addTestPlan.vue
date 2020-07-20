<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="testPlanModal2"
                :mask-closable="false"
                @on-cancel="close"
        >
            <div class="edit clearfix">
                <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                    <FormItem label="监测学年" v-if="disabled || isEdit" style="width: 300px;margin-right: 90px!important">
                        <i-select style="width: 100%;" v-model="obj.year" disabled>
                            <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </Option>
                        </i-select>
                    </FormItem>
                    <FormItem label="监测学年" v-else prop="year" style="width: 300px;margin-right: 90px!important">
                        <i-select style="width: 100%;" v-model="obj.year" :disabled="disabled">
                            <Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </Option>
                        </i-select>
                    </FormItem>

                    <!--<FormItem label="监测计划代号" v-if="disabled" style="width: 300px;margin-right: 0!important;">-->
                    <!--<i-input v-model="obj.code" :disabled="disabled" :maxlength="15" style="width: 300px"></i-input>-->
                    <!--</FormItem>-->
                    <FormItem label="监测计划代号" v-if="disabled" style="width: 300px;margin-right: 0!important;">
                        <i-input v-model="obj.code" :disabled="disabled" :maxlength="15" style="width: 300px"></i-input>
                    </FormItem>
                    <FormItem label="监测计划代号" v-else prop="code" style="width: 300px;margin-right: 0!important;">
                        <i-input v-model="obj.code" :disabled="disabled" :maxlength="15" style="width: 300px"></i-input>
                    </FormItem>
                </Form>
            </div>
            <span class="addschool" v-if="!disabled" @click="addtable">
                <img src="../../../../assets/unit/add.png" alt="add">
                <span>新增</span>
            </span>
            <i-table center :disabled-hover='true' size="small" :height="400" :columns="columns"
                     :data="tableData"></i-table>
            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="close" @click='close'>取消</button>
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>

        <Modal
                title="新增"
                :value="tableModal"
                :width="500"
                :mask-closable="false"
                class="addProjectObj"
                footer-hide
                class-name="vertical-center-modal"
                @on-cancel="tableclose"
        >
            <i-form
                    ref="tableform"
                    :model="tableform"
                    :rules="tablerules"
                    label-position="left">
                <FormItem label="监测学校" prop="school_id" style="margin-left: 80px;">
                    <i-select v-model="tableform.school_id" style="width:200px">
                        <i-option v-for="item of schoolList" :key="item.id" :value='item.dep_id' @click.native="getCount(item.count,item.school_name)">{{item.school_name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="监测人数" style="margin-left: 80px;" prop="count">
                    <i-input v-model="tableform.count" readonly style="width:200px"></i-input>
                </FormItem>
            </i-form>
            <div class="footer">
                <i-button class="close" type='default' @click='tableclose'>取消</i-button>
                <i-button class="confirm" type="primary" @click='tableconfirms'>保存</i-button>
            </div>
            <!-- <div slot="footer">
                <button type="button" class="close" @click='tableclose'>取消</button>
                <button type="button" class="confirm" @click='tableconfirms'>确定</button>
            </div> -->
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {yearLists,todayYear} from "@/libs/dateUtils";

    export default {
        name: 'addTestPlan',
        props: ['id', 'title', 'flag','isEdit'],
        data() {
            return {
                obj: {
                    year: todayYear(),
                    code: '',
                },
                rules: {
                    year: [{required: true, message: '请输入监测学年', trigger: 'change'}],
                    code: [{required: true, message: '请输入监测计划代号', trigger: 'change'}]
                },
                columns: [],
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
                        title: '学校',
                        key: 'dep_name'
                    },
                    {
                        title: '人数',
                        key: 'count'
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 80,
                        render: (h, params) => {
                            if (this.flag) {
                                return '';
                            }
                            return h('span', {
                                attrs: {
                                    class: 'delete'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.index);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                tableData: [],
                yearList: [],
                disabled: false,
                tableModal: false,
                tableform: {
                    school_id: '',
                    count: null,
                    school_name:''
                },
                tablerules: {
                    school_id: [{required: true, message: '请选择监测学校', trigger: 'change'}],
                    count: [{required: true, type: 'number', message: '请输入监测人数', trigger: 'blur'}],
                },
                schoolList: []
            };
        },
        methods: {
            // getSelectCondition() {
            //     //===========获取下拉列表查询条件
            //     this.$ajax({
            //         // 学校
            //         url: urls.dept_all_list,
            //         data: {}
            //     }).then(data => {
            //         if (data.code === 200) {
            //             this.schoolList = data.data.filter((item) => item.type === 2);
            //         } else {
            //             this.schoolList = [];
            //         }
            //     })
            //         .catch(err => {
            //             window.console.log(err);
            //         });
            // },

            delete(index) {
                this.tableData.splice(index, 1);
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }

                    if (!this.tableData.length) {
                        this.$Message.error('请维护监测对象');
                        return false;
                    }
                    let data = {};
                    data.planInfo = {
                        year: this.obj.year+'',
                        code: this.obj.code,
                    };

                    if (this.id) {
                        data.planInfo.id = this.id;
                        data.plan_objs = this.tableData.map(item => {
                            let items = {};
                            if (item.dep_id) {
                                items.dep_id = item.dep_id;
                            }
                            items.count = item.count;

                            return items;
                        });
                        // 编辑
                        this.$ajax({
                            url: urls.monitorPlan_update1,
                            data: data
                        }).then(data => {
                            if (data.code === 200) {
                                this.$Message.success('修改' + data.code + '监测计划成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(data.msg);
                                this.$emit('modal-close', true);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else {
                        data.plan_objs = this.tableData.map(item => {
                            let items = {};
                            items.dep_id = item.dep_id;
                            items.count = item.count;

                            return items;
                        });

                        // 新增
                        this.$ajax({
                            url: urls.monitorPlan_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.planInfo.code + '监测计划成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.msg);
                                this.$emit('modal-close', true);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }

                });
            },
            close() {
                this.$emit('modal-close');
            },
            getCount(count,school_name) {
                console.log(count)
                this.tableform.count = count
                this.tableform.school_name = school_name
            },
            addtable() {
                if(!this.obj.year) {
                    this.$Message.error('请选择监测计划学年！');
                    return;
                }
                this.$ajax({
                    url: urls.monitorPlan_count,
                    data: {
                        year: this.obj.year,
                        dep_id:''
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.schoolList = data.data;
                    } else {
                        this.schoolList = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                this.tableModal = true;

                this.$refs['tableform'].resetFields();
                this.tableform = {
                    count: null,
                };
                // this.getSelectCondition()
            },
            tableclose() {
                this.tableModal = false;
            },
            tableconfirms() {
                this.$refs['tableform'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    this.tableData.push({
                        count: this.tableform.count,
                        dep_name: this.tableform.school_name,
                        dep_id: this.tableform.school_id
                    });
                    this.tableModal = false;
                });
            },
            // 列表数据
            search() {
                this.$ajax({
                    url: urls.monitorPlan_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.obj = {
                            code: data.data.code,
                            year: data.data.year,
                        };
                        this.tableData = data.data.objs;
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
        },
        created() {
            this.yearList = yearLists().reverse();
            this.disabled = !!this.flag;
            if (!this.disabled) {
                this.columns = this.columns1;
            } else {
                this.columns = this.columns1.slice(0,4);
            }
            if (this.id) { //编辑&详情

                this.search();
            }
        }
    };
</script>
<style lang="less">
    .testPlanModal2 {
        .ivu-modal-body {
            padding: 18px 28px;
            overflow-y: auto;

            .ivu-form-item-label {
                color: #333 !important;
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
            font-size: 16px;
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

    .addProjectObj {
        .ivu-modal {
            .ivu-form-inline .ivu-form-item {
                margin-right: 22px !important;
            }
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

