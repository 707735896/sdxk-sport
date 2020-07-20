<template>
    <div class="addExam">
        <Modal
                :title='title'
                :value="true"
                :loading="loading"
                :mask-closable="false"
                :width="800"
                ok-text="保存"
                @on-ok="confirms()"
        >
            <Form inline :model="addFormData" label-position="top" class="modal-form">
                <FormItem label="体检项" style="margin-right: 90px!important;">
                    <i-input v-model.trim="addFormData.item" readonly style="width:310px;"/>
                </FormItem>
                <FormItem label="参考值类型" style="margin-right: 30px !important;">
                    <i-input style="width:140px;" v-model.trim="addFormData.type" readonly/>
                </FormItem>
                <FormItem label="单位" style="margin-right: 0 !important;">
                    <i-input style="width:140px;" v-model.trim="addFormData.unit" readonly/>
                </FormItem>
            </Form>
            <div class="add" @click="addItem" style="margin-bottom: 10px;">
                <img style="margin:0 6px;" src="../../../assets/common/add.png" alt="add"/>
                <span>新增</span>
            </div>
            <BaseTable ref="tab" :columns="columns1" :data="item_List" height="300" :offsetheight="640" :modalFlag="true"></BaseTable>
        </Modal>
        <Modal
                title="新增"
                :mask-closable="false"
                v-model="addmostModal"
                :width="562"
                @close="addclose"
                @on-ok="addItemToTable()"
        >
            <Form inline :model="mostAddFormData" ref="mostformInline" :rules="AddformRule" label-position="top"
                  class="modal-form">
                <FormItem label="年龄" prop="age">
                    <i-select style="width:200px" v-model="mostAddFormData.age">
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                        <Option value="13">13</Option>
                        <Option value="14">14</Option>
                        <Option value="15">15</Option>
                        <Option value="16">16</Option>
                        <Option value="17">17</Option>
                        <Option value="18">18</Option>
                    </i-select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <i-select style="width:200px" v-model="mostAddFormData.gender">
                        <Option :value="1">男</Option>
                        <Option :value="2">女</Option>
                    </i-select>
                </FormItem>
                <FormItem label="下限" prop="normal_low">
                    <i-input v-model.trim="mostAddFormData.normal_low" style="width:200px;"/>
                </FormItem>
                <FormItem label="上限" prop="normal_up">
                    <i-input style="width:200px" v-model.trim="mostAddFormData.normal_up"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='addclose'>取消</button>
                <button type="button" class="confirm" @click='addItemToTable'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import Urls from '@/service/Urls';
    export default {
        name: 'addExam',
        data() {
            return {
                loading: true,
                addmostloading: true,
                title: '设定正常值范围',
                modal: false,
                addmostModal: false,
                //弹框的表格
                item_List: [],
                addFormData: {
                    isnormal: '',
                    unit: '',
                    item: '',
                    type: '',
                    set_id: ''
                },
                mostAddFormData: {
                    age: '',
                    gender: '',
                    normal_low: '',
                    normal_up: '',
                },
                //最小弹窗的验证
                AddformRule: {
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9]?)?$/, message: '请填写数字且最多一位小数', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9]?)?$/, message: '请填写数字且最多一位小数', trigger: 'blur'}]
                },
                columns: [
                    {
                        field: 'department',
                        width: 180
                    },
                    {
                        field: 'itemType',
                        width: 200,
                    },
                    {
                        field: 'item',
                        width: 200,
                    },
                    {
                        field: 'result',
                        formatter: function (rowData) {
                            return rowData['type'] !== 'newline' ? ('<span >' + (rowData['result'] + '</span>')) : '<span   style="display:inline-block;line-height: 25px;width: 100%">' + (rowData['result'].split('@')[0] + ' <br/> ' + rowData['result'].split('@')[1]) + '</span>';
                        },
                        width: 200,
                        columnAlign: 'left',
                        isResize: true
                    },
                    {
                        field: 'custome-adv',
                        title: '操作',
                        width: 300,
                        componentName: 'table-operation',
                        // columnAlign: 'right',
                        // isFrozen: true,
                        // isResize: true
                    }
                ],
                columns1: [],
                columns_1: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        type: 'index'
                    }, {
                        title: '性别',
                        key: 'gender_name',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    }, {
                        title: '年龄',
                        key: 'age'
                    }, {
                        title: '下限',
                        key: 'normal_low'
                    }, {
                        title: '上限',
                        key: 'normal_up',
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    color: '#FF7200'
                                },
                                on: {
                                    click: () => {
                                        this.trash(params.index);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ],
                columns_2: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    }, {
                        title: '性别',
                        key: 'gender_name',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    }, {
                        title: '年龄',
                        key: 'age'
                    }, {
                        title: '下限',
                        key: 'abnormal_low'
                    }, {
                        title: '上限',
                        key: 'abnormal_up',
                    }, {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('span', {
                                attrs: {
                                    class: 'editBtn'
                                },
                                style: {
                                    display: 'inline-block',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    color: '#FF7200'
                                },
                                on: {
                                    click: () => {
                                        this.trash(params.index);
                                    }
                                }
                            }, '删除');
                        }
                    }
                ]
            };
        },
        methods: {
            addItem() {
                this.$refs['mostformInline'].resetFields();
                this.addmostModal = true;
            },
            customCompFunc(params) {
                if (params.type === 'normal') {
                    this.addFormData.isnormal = 'normal';
                    this.title = '逻辑检验界值';
                    this.columns1 = this.columns_1;
                    this.addFormData.set_id = params.rowData['action'];
                    this.addFormData.item = params.rowData['item'];
                    this.addFormData.unit = params.rowData['unit'];
                    this.addFormData.type = '正常值';
                    this.$ajax({
                        url: Urls.examination_config_list,
                        data: {
                            'set_id': params.rowData['action'],
                            'type': 0
                        }
                    }).then((data) => {
                        if (data.code === 200) {
                            this.item_List = data.data;
                            this.modal = true;
                        }
                    });
                }
                if (params.type === 'reset') {
                    this.addFormData.isnormal = 'reset';
                    this.title = '复测参考值';
                    this.addFormData.set_id = params.rowData['action'];
                    this.addFormData.item = params.rowData['item'];
                    this.addFormData.unit = params.rowData['unit'];
                    this.addFormData.type = '复测值';
                    this.$ajax({
                        url: Urls.examination_config_list,
                        data: {
                            'set_id': params.rowData['action'],
                            'type': 1
                        }
                    }).then((data) => {
                        if (data.code === 200) {
                            this.item_List = data.data;
                            this.columns1 = this.columns_2;
                            this.modal = true;
                        }
                    });
                }
            },
            addclose() {
                this.addmostModal = false;
            },
            addItemToTable() {
                this.$refs['mostformInline'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交!');
                        return false;
                    }
                    if(Number(this.mostAddFormData.normal_low)>Number(this.mostAddFormData.normal_up)){
                        this.$Message.error('下限值要小于上限值');
                        return false
                    }

                    let arr1 = [], arr2 = [];
                    for (let i = 0; i < this.item_List.length; i++) {
                        if (this.item_List[i].gender === 1) {
                            arr1.push(this.item_List.slice(i, i + 1)[0]);
                        } else {
                            arr2.push(this.item_List.slice(i, i + 1)[0]);
                        }
                    }
                    if (this.addFormData.isnormal === 'normal') {
                        if (this.mostAddFormData.gender === 1) {
                            arr1.push({
                                age: this.mostAddFormData.age,
                                gender: this.mostAddFormData.gender,
                                normal_low: this.mostAddFormData.normal_low,
                                normal_up: this.mostAddFormData.normal_up,
                            });
                        } else {
                            arr2.push({
                                age: this.mostAddFormData.age,
                                gender: this.mostAddFormData.gender,
                                normal_low: this.mostAddFormData.normal_low,
                                normal_up: this.mostAddFormData.normal_up,
                            });
                        }
                    } else {
                        if (this.mostAddFormData.gender === 1) {
                            arr1.push({
                                age: this.mostAddFormData.age,
                                gender: this.mostAddFormData.gender,
                                abnormal_up: this.mostAddFormData.normal_up,
                                abnormal_low: this.mostAddFormData.normal_low,
                            });
                        } else {
                            arr2.push({
                                age: this.mostAddFormData.age,
                                gender: this.mostAddFormData.gender,
                                abnormal_up: this.mostAddFormData.normal_up,
                                abnormal_low: this.mostAddFormData.normal_low,
                            });
                        }
                    }
                    let a1 = arr1.sort((a, b) => Number(a.age) - Number(b.age));
                    let a2 = arr2.sort((a, b) => Number(a.age) - Number(b.age));
                    this.item_List = a2.concat(a1);
                    this.addmostModal = false;
                });
            },
            //从table中删除数据
            trash(index) {
                let self = this;
                this.$confirm({
                    text: '是否删除此项参数？',
                    onOk: () => {
                        self.item_List.splice(index, 1);
                    },
                    cancel: () => {
                        self.$Message.info('已取消');
                    }
                });
            },
            //提交数据
            confirms() {
                this.loading = false;
                this.$nextTick(() => {
                    this.loading = true;
                });
                let that = this;
                let physicallimit = [];
                let ajaxurl = '';
                //如果是正常值
                if (this.addFormData.isnormal === 'normal') {
                    physicallimit = this.item_List.map((item) => {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'normal_low': item.normal_low,
                            'normal_up': item.normal_up
                        };
                    });
                    ajaxurl = Urls.examination_config_add;
                } else { //复测值
                    physicallimit = this.item_List.map((item) => {
                        return {
                            'set_id': that.addFormData.set_id,
                            'gender': parseInt(item.gender),
                            'age': parseInt(item.age),
                            'abnormal_low': item.abnormal_low,
                            'abnormal_up': item.abnormal_up
                        };
                    });
                    ajaxurl = Urls.examination_retest_add;
                }
                this.$ajax({
                    url: ajaxurl,
                    data: {
                        'physicallimit': physicallimit,
                        'set_id': that.addFormData.set_id
                    }
                }).then((data) => {
                    if (data.code === 200) {
                        this.$Message.success(data.result);
                        this.modal = false;
                    } else {
                        this.$Message.error(data.error);
                    }
                });
            },
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    .examinationItemConf {
        .v-table-title-class {
            font-size: 16px;
            color: #FFFFFF;
        }

        .v-table-body-class {
            font-size: 16px;
        }

        .v-table-title-cell,
        .v-table-body-cell {
            padding-left: 10px !important;
        }
        .handles{
            display: inline-block;

            cursor: pointer;
        }
        .handles:hover{
            opacity: 0.8;
        }
        .handler-ico {
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }

        .normarl {
            background: url("../../../assets/medicalExamination/reference_normal.png") no-repeat 100% 100%;
        }

        .restest {
            background: url("../../../assets/medicalExamination/reference_retest.png") no-repeat 100% 100%;
        }

        /*设置表格样式时，style标签不能设置scoped*/
        .column-cell {
            background-color: #ffffff;
        }

        .close {
            /*width: 70px;*/
            height: 30px;
            padding: 0 20px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(128, 128, 128, 1);
            background: rgba(255, 255, 255, 0);
            border: 1px solid rgba(173, 173, 173, 1);
            border-radius: 4px;
            cursor: pointer;
        }

        .confirm {
            /*width: 70px;*/
            height: 30px;
            padding: 0 20px;
            font-size: 16px;
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 114, 0, 1);
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
    }
</style>
