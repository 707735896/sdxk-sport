
<template>
    <div class="content-box condition">
        <div class="title">体检情况</div>
        <Divider dashed/>
        <Form class="search-form" inline :label-width="80" style="text-align: center;padding-top: 100px;">
            <FormItem label="体检计划">
                <i-select style="width:300px;text-align: left;" v-model="planCode" :label-in-value="true" @on-change="planChange">
                    <Option v-for="item in planList" :value="item.id" :key="item.id">{{item.code}}</Option>
                </i-select>
            </FormItem>
            <br>
            <FormItem :label-width="0" >
                <Button type="primary" class="search-btn" @click="initSearch()">查询</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import urls from '@/service/Urls';

    export default {
        name: 'Condition',
        data() {
            return {
                planCode: '',
                planList: [],
                value:{}
            };
        },
        methods: {
            planChange(value){
                this.value = value;
            },
            getSelectCondition() {
                this.$ajax({
                    url: urls.get_plan_id,
                    data: {}
                }).then(data => {
                    try {
                        this.planList = data.data.reverse() || [];
                        this.planCode = data.data[0].id;
                        this.value = {
                            label: data.data[0].code
                        }
                    }catch (e) {
                    }

                })
            },
            initSearch() {
                if(!this.planCode){
                    this.$Message.error('请选择体检计划');
                    return false;
                }
                this.$router.push(`/quenu/${this.value.label}/${this.planCode}`)
            }
        },

        created() {
            this.getSelectCondition();
        }
    };
</script>
<style lang="less">
    .condition {
        .ivu-select-disabled .ivu-select-selection,
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #515a6e;
        }
    }
</style>

