<template>
    <div class="examinationItemConf">
        <div class="content-box">
            <div class="title">体检项目参数配置</div>
            <v-table
                is-horizontal-resize
                is-vertical-resize
                :height="tableHeight"
                :vertical-resize-offset='80'
                :title-row-height="40"
                :row-height="48"
                title-bg-color="#498E8A"
                style="width:100%"
                ref="table"
                :columns="columns"
                :table-data="tableData"
                :cell-merge="cellMerge"
                :title-rows="titleRows"
                @on-custom-comp="customCompFunc"
            ></v-table>
        </div>
        <Modal
            :title='title'
            v-model="modal"
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
            <BaseTable ref="tab" :columns="columns1" :data="item_List" height="300" :offsetheight="640"
                   :modalFlag="true"></BaseTable>
        </Modal>
        <Modal
            title="新增"
            :mask-closable="false"
            v-model="addmostModal"
            :width="562"
            @close="addclose"
        >
            <Form class="modal-form" inline :model="mostAddFormData" ref="mostformInline" :rules="AddformRule"
                  label-position="top"
                  style="padding-left: 40px;">
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
    import {physicalConfig} from '../table_Data';
    import Urls from '@/service/Urls';
    import Vue from 'vue';
    // 操作按钮
    Vue.component('table-operation', {
        template: `<div v-if="rowData.action">
                <span class="handles" style="margin-right: 30px;" @click.stop.prevent="submitType('normal')">
                <span class="handler-ico normal"></span>逻辑检验界值</span>
                <span class="handles" @click.stop.prevent="submitType('reset')"><span class="handler-ico retest"></span>复测参考值</span></div>`,
        props: {
            rowData: {
                type: Object
            },
            field: {
                type: String
            },
            index: {
                type: Number
            }
        },
        methods: {
            submitType(type) {
                // 参数根据业务场景随意构造
                let params = {
                    type: type,
                    index: this.index,
                    rowData: this.rowData
                };
                this.$emit('on-custom-comp', params);
            }
        }
    });

    export default {
        name: 'examinationItemConf',
        data() {
            return {
                tableHeight: 500,
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
                    normal_up: ''
                },
                //最小弹窗的验证
                AddformRule: {},
                rule0:{
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(\.?[0-9]{0,2})$/, message: '请填写数字且最多两位小数', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'},
                        {pattern: /^-?[0-9]+(\.?[0-9]{0,2})$/, message: '请填写数字且最多两位小数', trigger: 'blur'}]
                },
                rule1:{ // 身高，体重，胸围
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9])$/, message: '请填写数字且最多一位小数', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9])$/, message: '请填写数字且最多一位小数', trigger: 'blur'}]
                },
                rule2:{  // 收缩压 ====舒张压 ======脉搏 === 心率  ==乳牙==恒牙
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请填写整数', trigger: 'blur'},
                        {max:3, message: '长度最大三位数字', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'},
                        {pattern: /^[0-9]+$/, message: '请填写整数', trigger: 'blur'},
                        {max:3, message: '长度最大三位数字', trigger: 'blur'}]
                },
                rule3:{
                    age: [{required: true, message: '请选择年龄', trigger: 'change'}],
                    gender: [{required: true, type: 'number', message: '请选择性别', trigger: 'change'}],
                    normal_low: [{required: true, message: '请填写最小限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9]{0,2})$/, message: '请填写正数且最多两位小数', trigger: 'blur'}],
                    normal_up: [{required: true, message: '请填写最大限制', trigger: 'blur'},
                        {pattern: /^[0-9]+(\.?[0-9]{0,2})$/, message: '请填写正数且最多两位小数', trigger: 'blur'}]
                },
                titleRows: [
                    [
                        {fields: ['department'], title: '体检科室', titleAlign: 'left'},
                        {fields: ['itemType', 'item'], title: '体检项', titleAlign: 'left', colspan: 2},
                        {fields: ['result'], title: '结果数据', titleAlign: 'left'},
                        {fields: ['custome-adv'], title: '操作', titleAlign: 'left'}
                    ]
                ],
                tableData: physicalConfig,
                columns: [
                    {
                        field: 'department',
                        width: 180
                    },
                    {
                        field: 'itemType',
                        width: 200
                    },
                    {
                        field: 'item',
                        width: 200
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
                        componentName: 'table-operation'
                    }
                ],
                columns1: [],
                columns_1: [
                    {
                        title: '序号',
                        width: 60,
                        align: 'center',
                        type: 'index'
                    },
                    {
                        title: '性别',
                        key: 'gender_name',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '下限',
                        key: 'normal_low'
                    },
                    {
                        title: '上限',
                        key: 'normal_up',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderButton(h,params);
                        }
                    }
                ],
                columns_2: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'gender_name',
                        render: (h, params) => {
                            return h('span', null, params.row.gender === 1 ? '男' : '女');
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '下限',
                        key: 'abnormal_low'
                    },
                    {
                        title: '上限',
                        key: 'abnormal_up',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return this.renderButton(h,params)
                        }
                    }
                ]
            };
        },
        methods: {
            renderButton(h,params){
                return h('span', {
                    attrs: {
                        class: 'editBtn'
                    },
                    style: {
                        display: 'inline-block',
                        marginRight: 0,
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
            },
            addItem() {
                this.$refs['mostformInline'].resetFields();
                this.addmostModal = true;
            },
            customCompFunc(params) {
                let id = params.rowData.action;
                switch(id){
                    case "2239fd8aaea54009aadea6ab822aef2b": // 身高
                    case "75cab047bf274671bd0ca1834ec3da90": // 体重
                    case "17A4564A4AC04DF5AA5DA0DA486BC2B0": // 胸围
                        this.AddformRule = this.rule1;
                        break;
                    case "9ed4b87c56514ffdbe2e58bc7f4aac33":  // 收缩压
                    case "9803d231a46d4817ac8e390c0f91e923":  // 舒张压
                    case "65c75a15844f4436a5df4f36e59273a2":  // 脉搏
                    case "d1c02fea23e34848a5b078f82651119f": // 心率
                    case 'b3a8a3525b4a41879a3711fad851f7e2':  // 龋患 乳牙
                    case "9c9544f49d70433ba354aaf68fddd36f":  // 龋患 恒牙
                    case "9f60daf57a544993ad86e9e3f4e7575f":  // 龋失 乳牙
                    case "c18d243702db4ef98e5ec8fe05a52310":  // 龋失 恒牙
                    case "25e2916dd6514653992dadfedec95b7a":  // 龋补 乳牙
                    case "8abcfdd9796342269be502c5a1e62ce0":  // 龋补 恒牙
                        this.AddformRule = this.rule2;
                        break;
                    case "06614cc576f743f19ab58d60729b9786": // 谷丙转氨酶ALT
                    case "ae6d475c3a3a4c5687195b6da1beb567": // 总胆红素TBIL
                    case 'd66e98043e5b476e89780618c604a79e': // 血红蛋白
                    case 'cdc1a9ed-8220-4914-bd23-0e2bff92b6e6': // 硬结直径
                    case '64BE4EE6A5CE4474A443A607AD19D186': // 平均直径
                        this.AddformRule = this.rule3;
                        break;
                    default:
                        this.AddformRule = this.rule0;
                        break;
                }
                this.$nextTick(() => {
                    this.$refs['mostformInline'].resetFields();
                });




                if (params.type === 'normal') {
                    this.title = '逻辑检验界值';
                    this.columns1 = this.columns_1;

                    this.addFormData.isnormal = 'normal';
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
                    this.title = '复测参考值';
                    this.columns1 = this.columns_2;

                    this.addFormData.isnormal = 'reset';
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
                            this.modal = true;
                        }
                    });
                }
            },
            addclose() {
                this.$refs['mostformInline'].resetFields();
                this.addmostModal = false;
            },
            addItemToTable() {
                this.$refs['mostformInline'].validate(valid => {
                    if (!valid) {
                        // this.$Message.error('请填写规范数据');
                        return false;
                    }
                    if (Number(this.mostAddFormData.normal_low) > Number(this.mostAddFormData.normal_up)) {
                        this.$Message.error('下限值要小于上限值');
                        return false;
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
                    return;
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
                    return;
                }
                if (field === 'item') {
                    if (rowData['col3']) {
                        return {
                            colSpan: rowData['col3'].col,
                            rowSpan: rowData['col3'].row,
                            content: rowData.item
                        };
                    } else {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            content: rowData.item
                        };
                    }
                }
            }
        },
        mounted() {
            let that = this;
            window.onresize = function () {
                that.tableHeight = window.innerHeight - that.$refs.tab.$el.offsetTop + 30;
                that.$refs.table.resize();
            };
            that.tableHeight = window.innerHeight - that.$refs.tab.$el.offsetTop + 30;
            that.$refs.table.resize();
        },
        beforeDestroy() {
            window.onresize = null;
        }
    };

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

        .handles {
            display: inline-block;

            cursor: pointer;
        }

        .handles:hover {
            opacity: 0.8;
        }

        .handler-ico {
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }

        .normal {
            background: url("../../../assets/medicalExamination/reference_normal.png") no-repeat 100% 100%;
        }

        .retest {
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
