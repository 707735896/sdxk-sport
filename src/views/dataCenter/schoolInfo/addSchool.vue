<template>
    <div id="schoolAdd">
        <Modal
                :title="title"
                :value="true"
                :width="644"
                :mask-closable="false"
                class="schoolModal"
                @on-cancel="close"
        >
            <Form ref="obj" :model="obj" :rules="rules" inline label-position="top">
                <FormItem label="学校代号" prop="code">
                    <i-input v-model.trim="obj.code" :maxlength="30" style="width: 230px" placeholder="请输入"></i-input>
                </FormItem>
                 <FormItem label="学校名称" prop="name" style="margin-right: 0 !important;">
                    <i-input v-model.trim="obj.name" :maxlength="30" style="width: 230px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="学校性质" prop="nature">
                    <i-select v-model="obj.nature" style="width:230px">
                        <i-option v-for="item of natureList" :key="item.id" :value='item.id'>{{item.value}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="所在区域" prop="area_id1" style="margin-right: 0 !important;">
                    <span slot="label" style="display: inline-block;width: 150px;text-align: left;">所在区域</span>
                    <i-select v-model="obj.area_id1" style="width:110px" @on-change="areaChange">
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="obj.area_id2" style="width:118px">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="详细地址" prop="location">
                    <i-input v-model.trim="obj.location" :maxlength="30" style="width: 506px" placeholder="请输入"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <button type="button" class="close" @click='close'>取消</button>
                <button type="button" class="confirm" @click='confirms'>保存</button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'AddSchool',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    code: '',
                    name: '',
                    nature: '',
                    area_id1: '',
                    area_id2: '',
                    location: ''
                },
                rules: {
                    code: [{required: true, message: '请输入学校代号', trigger: 'blur'}],
                    name: [{required: true, message: '请输入学校名称', trigger: 'blur'}],
                    nature: [{required: true, message: '请选择学校性质', trigger: 'change'}],
                    area_id1: [{required: true, message: '请选择所在区域', trigger: 'change'}],
                    location: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
                },
                hospitalList: [],
                areaList1: [],
                areaList: [],
                natureList: [],
                tempArea: []
            };
        },
        methods: {
            getSelectCondition() {
                /// ===========学校性质，接口不全
                this.$ajax({
                    url: urls.dictm_all_list,
                    data: {
                        "category_id": "81D5B0F79E0E4C83E050007F010062EE",
                        "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.natureList = data.data;
                    } else {
                        this.natureList = [];
                    }
                }).catch(err => {
                    this.natureList = [];
                });
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {
                        // "type": 2,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList1 = data.data.filter((item) => item.type === 2);
                    } else {
                        this.areaList1 = [];
                    }
                }).catch(err => {
                    this.areaList1 = [];
                });
            },
            areaChange(value){
                this.obj.area_id2 = '';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "pid":value,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 3 && item.pid === value);;
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            getArea(value){
                this.$ajax({ // 性质
                    url: urls.area_all_list,
                    data: {
                        // "type": 3,
                        // "status": 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        for(var i = 0;i < data.data.length;i++){
                            if(data.data[i].id === value){
                                this.obj.area_id1 = data.data[i].pid;
                                break;
                            }
                        }
                        this.areaList = data.data.filter((item) => item.pid === this.obj.area_id1 && item.type === 3)
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            search() {
                this.$ajax({
                    url: urls.dept_info,
                    data: {
                        id: this.id
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.getArea(data.data.area_id);
                        this.obj = {
                            name: data.data.name,
                            code: data.data.code2,
                            nature: data.data.nature,
                            area_id1: '',
                            area_id2:data.data.area_id,
                            location: data.data.location
                        };
                    }
                }).catch(err => {
                    window.console.log(err);
                });
            },
            confirms() {
                this.$refs['obj'].validate(valid => {
                    if (!valid) {
                        this.$Message.error('还有必填项字段未填，请确认后再提交！');
                        return false;
                    }
                    if(!this.obj.area_id2){
                        this.$Message.error('所在区域请选择完整！');
                        return false;
                    }
                    let data;
                    if (this.id) { // 编辑
                        data = {
                            id: this.id,
                            name: this.obj.name,
                            code2: this.obj.code,
                            nature: this.obj.nature,
                            area_id:this.obj.area_id2,
                            location: this.obj.location,
                            type: 2
                        };
                        this.$ajax({
                            url: urls.dept_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '学校成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增
                        data = {
                            name: this.obj.name,
                            code2: this.obj.code,
                            nature: this.obj.nature,
                            area_id:this.obj.area_id2,
                            location: this.obj.location,
                            type: 2
                        };
                        this.$ajax({
                            url: urls.dept_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '学校成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    }
                });
            },
            close() {
                this.$emit('modal-close');
            }
        },
        created() {
            this.getSelectCondition();
            if (this.id) { //编辑
                this.search();
            }
        }
    };
</script>
<style lang="less">
    .schoolModal {
        /*.ivu-modal-footer {*/
            /*border: none;*/
            /*padding: 0 38px 34px;*/
        /*}*/
        .ivu-modal-body {
            height: 300px;
            padding-top: 35px;
            .ivu-form-item-label {
                color: #333 !important;
            }
        }
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
        .ivu-form{
            padding: 0 40px;
        }
        .close {
            width: 70px;
            height: 30px;
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
            width: 70px;
            height: 30px;
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
