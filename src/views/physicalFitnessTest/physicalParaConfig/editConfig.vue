<template>
    <div class="editconfig">
        <Modal
            :title='title'
            :value="true"
            :loading="test_loading"
            :mask-closable="false"
            :width="800"
            ok-text="保存"
            @on-ok="testsubmit()"
            @on-cancel="testClose"
        >
            <Form inline :model="test" label-position="top" class="modal-form">
                <FormItem label="体测项" style="margin-right: 90px!important;">
                    <i-input v-model="test.item" readonly style="width:310px;"/>
                </FormItem>
                <FormItem label="参考值类型" style="margin-right: 30px !important;">
                    <i-input style="width:140px;" v-model="test.type" readonly/>
                </FormItem>
                <FormItem label="单位" style="margin-right: 0 !important;">
                    <i-input style="width:140px;" v-model="test.unit" readonly/>
                </FormItem>
            </Form>
            <div class="add" @click="addItem">
                <img src="@/assets/common/add.png" alt="add"/>
                新增
            </div>
            <BaseTable :columns="columns" :data="tableData" height="300" :modalFlag="true"
                   style="margin-bottom: 40px;"></BaseTable>
        </Modal>
        <Modal
            title="新增"
            :loading="addtestloading"
            :mask-closable="false"
            v-model="addtestModal"
            :width="562"
            :styles="{top: '300px',width:'562px'}"
            @on-ok="addtestToTable()"
            @on-cancel="addtestModalClose"
            ok-text="添加"
        >
            <Form inline :model="addtestData" ref="addtestformInlie" :rules="addtestformRule" label-position="top"
                  class="modal-form">
                <FormItem label="年级" prop="grade_id">
                    <i-select style="width:200px" v-model="addtestData.grade_id" :label-in-value="true"
                              @on-change="setGradeName">
                        <Option v-for="item in gradeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                    </i-select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select style="width:200px" v-model="addtestData.gender">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </i-select>
                </FormItem>
                <FormItem label="下限" prop="lower" class="ivu-form-item-required">
                    <i-input v-model.trim="addtestData.lower" style="width:200px;"/>
                </FormItem>
                <FormItem label="上限" prop="upper" class="ivu-form-item-required">
                    <i-input v-model.trim="addtestData.upper" style="width:200px"/>
                </FormItem>
                <FormItem :label="labelTitle" prop="score" v-show="score_show" class="ivu-form-item-required">
                    <i-input v-model.trim="addtestData.score" style="width:200px"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import Urls from '@/service/Urls';

    export default {
        name: 'editConfig',
        props: {
            label: '',
            row: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            const validatelower = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请填写最小限制'));
                } else {
                    if (this.row.id === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                        if (!/^-?[0-9]+(\.?[0-9]+)?$/.test(value)) {
                            callback(new Error('请输入数字'));
                        } else {
                            callback();
                        }
                    } else {
                        if (!/^-?[0-9]+(\.?[0-9]+)?$/.test(value)) {
                            callback(new Error('请输入数字'));
                        } else if (parseFloat(value) < 0) {
                            if (this.label !== 4) {
                                callback(new Error('请输入正数'));
                            } else {
                                callback();
                            }

                        } else {
                            callback();
                        }
                    }
                }
            };
            const validateupper = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请填写最大限制'));
                } else {
                    if (this.row.id === '093C7820FD4346789DA7FF8ACB981E65') { // 坐位体前屈
                        if (!/^-?[0-9]+(\.?[0-9]+)?$/.test(value)) {
                            callback(new Error('请输入数字'));
                        } else {
                            callback();
                        }
                    } else {
                        if (!/^-?[0-9]+(\.?[0-9]+)?$/.test(value)) {
                            callback(new Error('请输入数字'));
                        } else if (parseFloat(value) < 0) {
                            if (this.label !== 4) {
                                callback(new Error('请输入正数'));
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }
                    }

                }
            };
            const validatescore = (rule, value, callback) => {
                if (this.type === 3 || (this.type === 4)) {
                    if (!value) {
                        callback(new Error('请填写分数'));
                    } else {
                        if (!/^-?[0-9]+(\.?[0-9]{1})?$/.test(value)) {
                            callback(new Error('请输入数字,最多一位小数'));
                        } else {
                            if (Number(value) > 100) {
                                callback(new Error('百分制最大上限为100，请核对分数'));
                            } else {
                                callback();
                            }
                        }
                    }
                } else {
                    callback();
                }
            };

            const validatelower1 = (rule, value, callback) => { // 握力  BMI
                if (!value) {
                    callback(new Error('请填写最小限制'));
                } else {
                    if (!/^[0-9]+(\.?[0-9])?$/.test(value)) {
                        callback(new Error('请输入数字，且最多一位小数点位'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }

                    } else {
                        callback();
                    }
                }
            };
            const validatelower2 = (rule, value, callback) => { // 俯卧背起  立定跳远  斜身引体  引体向上  一分钟仰卧起坐 一分钟跳绳  50米跑  50米*8往返跑  800米跑  1000米跑  肺活量
                if (!value) {
                    callback(new Error('请填写最小限制'));
                } else {
                    if (!/^[0-9]?$/.test(value)) {
                        callback(new Error('请输入正整数'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            };
            const validatelower3 = (rule, value, callback) => { // 坐位体前屈
                if (!value) {
                    callback(new Error('请填写最小限制'));
                } else {
                    if (!/^-?[0-9]+(\.?[0-9])?$/.test(value)) {
                        callback(new Error('请输入数字，且最多一位小数点位'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }

                    } else {
                        callback();
                    }
                }
            };

            const validateupper1 = (rule, value, callback) => {  // 握力  BMI
                if (!value) {
                    callback(new Error('请填写最大限制'));
                } else {
                    if (!/^[0-9]+(\.?[0-9])?$/.test(value)) {
                        callback(new Error('请输入数字，且最多一位小数点位'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            };
            const validateupper2 = (rule, value, callback) => {  // 握力  BMI
                if (!value) {
                    callback(new Error('请填写最大限制'));
                } else {
                    if (!/^[0-9]+(\.?[0-9])?$/.test(value)) {
                        callback(new Error('请输入数字，且最多一位小数点位'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            };
            const validateupper3 = (rule, value, callback) => {  // 握力  BMI
                if (!value) {
                    callback(new Error('请填写最大限制'));
                } else {
                    if (!/^[0-9]+(\.?[0-9])?$/.test(value)) {
                        callback(new Error('请输入数字，且最多一位小数点位'));
                    } else if (parseFloat(value) < 0) {
                        if (this.label !== 4) {
                            callback(new Error('请输入正数'));
                        } else {
                            callback();
                        }
                    } else {
                        callback();
                    }
                }
            };

            return {
                labelTitle: '',
                gradeList: [],
                //   分数modal
                title: '',
                test_loading: true,
                type: 0,
                test: {
                    set_id: '',
                    item: '',
                    type: '',
                    unit: ''
                },
                columns: [],
                tableData: [],
                addtestloading: true,
                addtestModal: false,
                score_show: false,
                addtestData: {
                    grade_id: '',
                    gender: '',
                    lower: '',
                    upper: '',
                    score: ''
                },
                selectGradeName: '',
                addtestformRule: {
                    grade_id: [{required: true, message: '请选择年级', trigger: 'change'}],
                    gender: [{required: true, message: '请选择性别', trigger: 'change'}],
                    lower: [{validator: validatelower, trigger: 'blur'}],
                    upper: [{validator: validateupper, trigger: 'blur'}],
                    score: [{validator: validatescore, trigger: 'blur'}]
                },
                column1: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '下限',
                        key: 'lower'
                    },
                    {
                        title: '上限',
                        key: 'upper'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderTrashButton(h, params);
                        }
                    }
                ],
                column2: [
                    {
                        title: '序号',
                        width: 60,
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '下限',
                        key: 'lower'
                    },
                    {
                        title: '上限',
                        key: 'upper'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderTrashButton(h, params);
                        }
                    }
                ],
                column3: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '得分',
                        key: 'score'
                    },
                    {
                        title: '下限',
                        key: 'lower'
                    },
                    {
                        title: '上限',
                        key: 'upper'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderTrashButton(h, params);
                        }
                    }
                ],
                column4: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '年级',
                        key: 'grade_name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '加分',
                        key: 'score'
                    },
                    {
                        title: '下限',
                        key: 'lower'
                    },
                    {
                        title: '上限',
                        key: 'upper'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderTrashButton(h, params);
                        }
                    }
                ]
            };
        },
        methods: {
            renderTrashButton(h, params) {
                return h('span', {
                    attrs: {
                        class: 'editBtn'
                    },
                    style: {
                        display: 'inline-block',
                        padding: 0,
                        cursor: 'pointer',
                        color: '#FF7200'
                    },
                    on: {
                        click: () => {
                            this.Itemdelete(params.row);
                        }
                    }
                }, '删除');
            },
            //操作
            operate(row, type) {
                this.test.item = row.name;
                this.test.unit = row.unit;
                this.test.set_id = row.id;
                this.type = type;
                if (type === 1) {
                    this.test.type = '逻辑检验界值';
                    this.title = '逻辑检验界值';
                    this.score_show = false;
                    this.columns = this.column1;
                }
                if (type === 2) {
                    this.test.type = '复测参考值';
                    this.title = '复测参考值';
                    this.score_show = false;
                    this.columns = this.column2;
                }
                if (type === 3) {
                    this.test.type = '得分标准';
                    this.title = '得分标准';
                    this.score_show = true;
                    this.labelTitle = '得分';
                    this.columns = this.column3;
                }
                if (type === 4) {
                    this.test.type = '加分标准';
                    this.title = '加分标准';
                    this.score_show = true;
                    this.labelTitle = '加分';
                    this.columns = this.column4;
                }
                this.getSetInfo(row.id, type + '');
            },
            //分数提交
            testsubmit() {
                this.test_loading = false;
                this.$nextTick(() => {
                    this.test_loading = true;
                });
                let data = this.tableData.map(item => {
                    return {
                        id: item.id,
                        set_id: item.set_id,
                        unit: item.unit,
                        type: item.type,
                        grade_id: item.grade_id,
                        gender: item.gender,
                        lower: item.lower,
                        upper: item.upper,
                        score: item.score
                    };
                });
                this.$ajax({ // 年级列表
                    url: Urls.elecPhysical_Para_edit,
                    data: {
                        'paramConfigList': data
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.$Message.success('提交成功');
                        this.$emit('modal-close');
                    } else {
                        this.$Message.error(data.error);
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            addItem() {
                this.addtestModal = true;
                this.addtestData = {
                    grade_id: '',
                    gender: '',
                    lower: '',
                    upper: '',
                    score: ''
                };
            },
            //添加数据到表格
            addtestToTable() {
                this.addtestloading = false;
                this.$nextTick(() => {
                    this.addtestloading = true;
                });
                this.$refs['addtestformInlie'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    if (Number(this.addtestData.lower) > Number(this.addtestData.upper)) {
                        this.$Message.error('下限数值应小于上限数值!');
                        return false;
                    }
                    let obj = {};
                    obj.gender = parseInt(this.addtestData.gender);
                    obj.grade_id = this.addtestData.grade_id;
                    obj.set_id = this.test.set_id;
                    obj.grade_name = this.selectGradeName;
                    obj.upper = this.addtestData.upper;
                    obj.lower = this.addtestData.lower;
                    obj.unit = this.test.unit;
                    obj.type = this.type;
                    if (this.type === 3 || this.type === 4) {
                        obj.score = this.addtestData.score;
                    }
                    // ===握力   ===坐位体前屈    ===俯卧背起   ===BMI   === 50米  === 50*8 米 === 800米  === 1000 米
                    let id = this.row.id;
                    if (id === 'B2F6CDB8BC704A0A9F280C5CDA8D0019' || id === '093C7820FD4346789DA7FF8ACB981E65' ||
                        id === 'F657424A586743F891E5D7010301E204' || id === '3012F15D7AEF474CB5E0CFF83671FAC5' ||
                        id === '1E0C72B68D8947E894399EFE598F9DC3' || id === 'AF32A3AEB7C4466CB3A170D0348E16A3' ||
                        id === '6E40F3C06491405AAEBBCDB39FB43AD2' || id === '84940DA547A944FEB7935D28D52A5803') {
                        this.tableData.push({
                            gender: obj.gender,
                            grade_id: obj.grade_id,
                            set_id: obj.set_id,
                            grade_name: obj.grade_name,
                            upper: (obj.upper + '').indexOf('.') === -1 ? obj.upper : parseFloat(obj.upper).toFixed(1),
                            lower: (obj.lower + '').indexOf('.') === -1 ? obj.lower : parseFloat(obj.lower).toFixed(1),
                            unit: obj.unit,
                            type: obj.type,
                            score: obj.score
                        });
                    } else {
                        this.tableData.push({
                            gender: obj.gender,
                            grade_id: obj.grade_id,
                            set_id: obj.set_id,
                            grade_name: obj.grade_name,
                            upper: Math.floor(obj.upper).toFixed(0),
                            lower: Math.floor(obj.lower).toFixed(0),
                            unit: obj.unit,
                            type: obj.type,
                            score: obj.score
                        });
                    }

                    this.addtestModal = false;
                    this.$refs.addtestformInlie.resetFields();
                });
            },
            //从表格中删除
            Itemdelete(para) {
                this.$confirm({
                    text: '确认要删除吗？',
                    onOk: () => {
                        this.tableData.splice(para._index, 1);
                    },
                    cancel: () => {
                        // this.$Message.info('已取消');
                    }
                });
            },
            testClose() {
                this.addtestModal = false;
                this.$emit('modal-close');
            },
            addtestModalClose() {
                this.$refs.addtestformInlie.resetFields();
            },
            getGradeSelect() {
                this.$ajax({
                    url: Urls.grade_no_list,
                    data: {
                        garde: '7CF13CDB4C1D4A7FBE9A15989376B639' // 十二年
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.gradeList = data.data;
                    } else {
                        this.gradeList = [];
                    }
                }).catch(() => {
                    this.gradeList = [];
                });

            },
            setGradeName(item) {
                if (item) {
                    this.selectGradeName = item.label;
                }
            },
            getSetInfo(id, type) {
                this.$ajax({
                    url: Urls.elecPhysical_Para_info,
                    data: {
                        set_id: id,
                        type: Number(type)
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.tableData = data.data;
                    } else {
                        this.tableData = [];
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            }
        },
        created() {
            this.getGradeSelect();
            this.operate(this.row, this.label);
        }
    };
</script>

<style scoped>

</style>
