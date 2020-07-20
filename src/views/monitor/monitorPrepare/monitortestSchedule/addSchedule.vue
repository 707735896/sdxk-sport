<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="800"
                class="addSchedule"
                :mask-closable="false"
                @on-cancel="close"
                class-name="vertical-center-modal"
        >
            <div class="edit clearfix">
                <Form ref="obj" inline label-position="top">
                    <FormItem label="监测学年" style="width: 300px;margin-right: 90px!important">
                        <i-select style="width:300px" v-model="obj.year" :disabled="disabled">
                            <i-option v-for="item in yearList" :value="item.value" :key="item.value">{{item.name}}
                            </i-option>
                        </i-select>
                    </FormItem>
                    <FormItem label="监测计划代号" style="width: 300px;margin-right: 0!important">
                        <i-input v-model="obj.code" :disabled="disabled" :maxlength="15"></i-input>
                    </FormItem>
                </Form>
            </div>
            <i-table center :disabled-hover='true' size="small" :height="400" :columns="columns"
                     :data="tableData"></i-table>
            <div slot="footer">
                <div v-show="!flag">
                    <button type="button" class="confirm" @click='confirms'>保存</button>
                </div>
            </div>
        </Modal>

        <Modal
                title="监测排程编辑"
                :value="tableModal"
                :width="700"
                :mask-closable="false"
                footer-hide
                class="addSchedule2"
                @on-cancel="tableclose"
                class-name="vertical-center-modal"
        >
            <i-form
                    ref="tableform"
                    :model="tableform"
                    inline
                    :rules="tablerules"
                    label-position="top">
                <FormItem label="学校" style="margin-left: 20px;">
                    <i-input v-model="tableform.school_name" style="width:280px" :disabled="disabled"></i-input>
                </FormItem>
                <FormItem label="人数">
                    <i-input v-model="tableform.count" style="width:280px" :disabled="disabled"></i-input>
                </FormItem>
                <FormItem label="监测队伍" prop="team_id" style="margin-left: 20px;">
                    <i-select v-model="tableform.team_id" style="width:280px">
                        <i-option v-for="item of teamList" :key="item.id" :value='item.id'
                                  @click.native="teamChanes(item.name)">{{item.name}}
                        </i-option>
                    </i-select>
                </FormItem>
                <FormItem label="监测时间" prop="date">
                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm"
                                v-model="tableform.date" style="width: 280px">
                    </DatePicker>
                </FormItem>
            </i-form>
            <div style="height: 30px"></div>
            <div class="footer">
                <button type="button" class="close" @click='tableclose'>取消</button>
                <button type="button" class="confirm" @click='tableconfirms'>确定</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';
    import {datetimeformatFromString, stringFromnDateToNormal, yearLists} from '@/libs/dateUtils';

    export default {
        name: 'addSchedule',
        props: ['id', 'title', 'flag'],
        data() {
            return {
                value1: null,
                yearList: [],
                obj: {
                    year: '',
                    code: '',
                },
                columns: [],
                columns1: [

                    {
                        type: 'index',
                        title: '序号',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '学校',
                        key: 'dep_name',
                        align: 'center',
                        minWidth: 120

                    },
                    {
                        title: '人数',
                        key: 'count',
                        align: 'center',
                        width: 60,
                    },
                    {
                        title: '监测队伍',
                        key: 'team_name',
                        minWidth: 100,
                        align: 'center'
                    },
                    {
                        title: '监测时间',
                        minWidth: 200,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.exam_start && params.row.exam_end) {
                                return h('span', null, stringFromnDateToNormal(params.row.exam_start) + '-' + stringFromnDateToNormal(params.row.exam_end));
                            } else {
                                return '';
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'operator',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.status === 2) {
                                return h('span', '--');
                            }
                            return h('span', {
                                attrs: {
                                    class: 'delete'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index, params.row);
                                    }
                                }
                            }, '编辑');
                        }
                    }
                ],//编辑页
                columns2: [
                    {
                        type: 'index',
                        title: '序号',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '学校',
                        key: 'dep_name',
                        align: 'center',
                        minWidth: 120

                    },
                    {
                        title: '人数',
                        key: 'count',
                        align: 'center',
                        width: 60,
                    },
                    {
                        title: '监测队伍',
                        key: 'team_name',
                        minWidth: 100,
                        align: 'center'
                    },
                    {
                        title: '监测时间',
                        minWidth: 200,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.exam_start && params.row.exam_end) {
                                return h('span', null, stringFromnDateToNormal(params.row.exam_start) + '-' + stringFromnDateToNormal(params.row.exam_end));
                            } else {
                                return '';
                            }
                        }
                    },
                ],
                tableData: [],
                disabled: true,
                tableModal: false,
                tableform: {
                    count: '',
                    school_id: '',
                    school_name: '',
                    team_id: '',
                    team_name: '',
                    date: []
                },
                teamList: [],
                tablerules: {
                    team_id: [{required: true, message: '请选择监测队伍', trigger: 'change'}],
                    date: [
                        {required: true, type: 'array', message: '请选择监测年份', trigger: 'change'}
                    ]
                },
                index: null,
            };
        },
        methods: {
            teamChanes(_name) {
                this.tableform.team_name = _name;
            },

            edit(index, row) {
                this.index = index;
                this.tableModal = true;
                // 监测队伍下拉
                this.$ajax({
                    url: urls.monitorTeam_selector,
                    data: {
                        name: '',
                        year: this.obj.year
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.teamList = data.data;
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
                if (row.exam_end && row.exam_start) {
                    this.tableform = {
                        id: row.id,
                        count: row.count,
                        team_id: row.team_id ? row.team_id : '',
                        team_name: row.team_name,
                        dep_id: row.dep_id,
                        school_name: row.dep_name,
                        date: [new Date(row.exam_start), new Date(row.exam_end)],
                    };
                } else {
                    this.tableform = {
                        id: row.id,
                        count: row.count,
                        dep_id: row.dep_id,
                        school_name: row.dep_name,
                        team_id: row.team_id ? row.team_id : '',
                        team_name: row.team_name,
                        date: [],
                    };
                }

            },
            confirms() {
                if(this.flag){
                    this.$emit('modal-close', true);
                }else {
                    let f = this.tableData.every(item => {
                        return item.exam_end && item.exam_start
                    })
                    if(f){
                        this.$emit('modal-close', true);
                    }else {
                        this.$emit('modal-close');
                    }
                }
            },
            close() {
                if(this.flag){
                    this.$emit('modal-close');
                }else {
                    let f = this.tableData.every(item => {
                        return item.exam_end && item.exam_start
                    })
                    if(f){
                        this.$emit('modal-close', true);
                    }else {
                        this.$emit('modal-close');
                    }
                }
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
                    if (this.tableform.date[0].getTime() >= this.tableform.date[1].getTime()) {
                        this.$Message.error('开始时间要小于结束时间！');
                        return false;
                    }
                    this.$ajax({
                        url: urls.monitorPlan_Schedule,
                        data: {
                            status: 2,
                            team_id: this.tableform.team_id,
                            dep_id: this.tableform.dep_id,
                            plan_id: this.id,
                            id: this.tableform.id,
                            exam_start_long: this.tableform.date[0].getTime(),
                            exam_end_long: this.tableform.date[1].getTime()
                        }
                    }).then(json => {
                        if (json.code === 200) {
                            this.$Message.success('排程时间设置成功');
                            this.search();
                            this.tableclose();
                        } else {
                            this.$Message.error('排程时间设置失败');
                        }
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
            if (this.flag) {
                this.columns = this.columns2;
            } else {
                this.columns = this.columns1;
            }
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .addSchedule {
        .ivu-modal-body {
            padding: 18px 28px;
            overflow-y: auto;

            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .ivu-upload {
            display: block !important;
            width: 100% !important;
            padding: 6px 10px;
            text-align: center;
            cursor: pointer;
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
            color: #518783;
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

    .addSchedule2 {
        .ivu-modal-body {
            .ivu-form-item-label {
                color: #333 !important;
            }
        }

        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }

        .ivu-modal-footer {
            border: none;
            padding: 17px 38px 17px;
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


