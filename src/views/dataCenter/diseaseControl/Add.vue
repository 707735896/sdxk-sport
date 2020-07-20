<template>
    <div>
        <Modal
                :title="title"
                :value="true"
                :width="500"
                :mask-closable="false"
                class="deseModal label-right"
                @on-cancel="close"
        >
            <Form ref="obj" :model="obj" :rules="rules" label-position="left" :label-width="84">
                <FormItem label="疾控中心" prop="name" style="margin-left: 30px">
                    <i-input v-model.trim="obj.name" :maxlength="20" style="width: 280px" placeholder="请输入"></i-input>
                </FormItem>
                <FormItem label="所属区域" prop="area_id1" style="margin-left: 30px">
                    <i-select v-model="obj.area_id1" style="width:130px;" @on-change="areaChange">
                        <i-option v-for="item of areaList1" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                    <i-select v-model="obj.area_id2" style="width:147px;">
                        <i-option v-for="item of areaList" :key="item.id" :value='item.id'>{{item.name}}</i-option>
                    </i-select>
                </FormItem>
                <FormItem label="详细地址" prop="location" style="margin-left: 30px">
                    <i-input v-model.trim="obj.location" :maxlength="30" style="width: 280px"
                             placeholder="请输入"></i-input>
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
        name: 'Add',
        props: ['id', 'title'],
        data() {
            return {
                obj: {
                    name: '',
                    area_id1: '',
                    area_id2: '',
                    location: ''
                },
                rules: {
                    name: [{required: true, message: '请输入疾控中心名称', trigger: 'blur'}],
                    area_id1: [{required: true, message: '请选择所在区域', trigger: 'change'}],
                    location: [{required: true, message: '请输入详细地址', trigger: 'blur'}]
                },
                areaList: [],
                areaList1: [],
            };
        },
        methods: {
            getSelectCondition() {
                this.$ajax({ // 区域
                    url: urls.area_all_list,
                    data: {}
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
            areaChange(value) {
                this.obj.area_id2 = '';
                this.$ajax({ // 区
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        this.areaList = data.data.filter((item) => item.type === 3 && item.pid === value);
                    } else {
                        this.areaList = [];
                    }
                }).catch(err => {
                    this.areaList = [];
                });
            },
            getArea(value) {
                this.$ajax({ // 性质
                    url: urls.area_all_list,
                    data: {}
                }).then(data => {
                    if (data.code === 200) {
                        for (let i = 0; i < data.data.length; i++) {
                            if (data.data[i].id === value) {
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
                        this.obj.name = data.data.name;
                        // this.obj.area_id1 = data.data.area_id1;
                        this.obj.area_id2 = data.data.area_id;
                        this.obj.location = data.data.location;
                        // this.obj = {
                        //     name: data.data.name,
                        //     area_id1: '',
                        //     area_id2: data.data.area_id,
                        //     location: data.data.location
                        // };
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
                    if (!this.obj.area_id2) {
                        this.$Message.error('所在区域请选择完整！');
                        return false;
                    }
                    const {name, area_id2, location} = this.obj;

                    let data = {
                        name: name,
                        area_id: area_id2,
                        location: location,
                        nature: 1,
                        type: 4
                    };
                    if (this.id) { // 编辑
                        data.id = this.id;

                        this.$ajax({
                            url: urls.dept_edit,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('编辑' + data.name + '成功');
                                this.$emit('modal-close', true);
                            } else {
                                this.$Message.error(json.error);
                            }
                        }).catch(err => {
                            window.console.log(err);
                        });
                    } else { //新增

                        this.$ajax({
                            url: urls.dept_add,
                            data: data
                        }).then(json => {
                            if (json.code === 200) {
                                this.$Message.success('新增' + data.name + '成功');
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
    .deseModal {
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
