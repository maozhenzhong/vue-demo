<template>
  <div class="container-fluid">
    <go-back></go-back>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('bank.editBank')" name="bankInfo">
        <el-form :model="bankForm" :rules="rules" status-icon ref="bankForm">
          <el-form-item prop="name">
            <el-input name="name" type="text" ref="name" v-model="bankForm.name" maxlength="10" autoComplete="off" :placeholder="$t('bank.name')"></el-input>
          </el-form-item>
          <el-form-item prop="contactPhone">
            <el-input name="contactPhone" type="tel" ref="contactPhone" v-model="bankForm.contactPhone" maxlength="10" autoComplete="off" :placeholder="$t('bank.contactPhone')"></el-input>
          </el-form-item>
          <el-form-item prop="logo">
            <el-input name="logo" type="text" ref="logo" v-model="bankForm.logo" maxlength="10" autoComplete="off" :placeholder="$t('bank.logo')"></el-input>
          </el-form-item>
          <el-form-item prop="briefIntroduction">
            <el-input name="briefIntroduction" type="textarea" ref="briefIntroduction" v-model="bankForm.briefIntroduction" maxlength="10" autoComplete="off" :placeholder="$t('bank.briefIntroduction')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="12" style="padding-left: 0; padding-right: 12px;">
              <el-button class="el-button-block" type="primary" @click.native.prevent="submitCrewInfo" plain>{{$t('form.reset')}}</el-button>
            </el-col>
            <el-col :span="12" style="padding-left: 12px; padding-right: 0;">
              <el-button class="el-button-block" type="success" @click.native.prevent="submitCrewInfo" plain>{{$t('form.submit')}}</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { fetchInfo } from '@/api/bank'
import goBack from '@/components/GoBack'
import errorConfig from '@/errorConfig'
// import {
//   isvalidCrewRealname,
//   isvalidCrewStaff,
//   isvalidPassword,
//   isvalidRePassword
// } from '@/utils/validate'

export default {
  name: 'editBank',
  components: {
    goBack
  },
  data() {
    return {
      activeName: 'bankInfo',
      bankId: null,
      bankForm: {
        name: null,
        briefIntroduction: null,
        contactPhone: null,
        logo: null
      },
      rules: {

      }
    }
  },
  created() {
    this.getBankInfo(this.getBankId())
  },
  methods: {
    getBankId() {
      this.bankId = this.$route.params.id
      return this.bankId
    },
    getBankInfo(id) {
      if (id && id !== 'null') {
        fetchInfo(id).then(response => {
          const responseData = response.data.data
          this.bankForm = responseData
          console.log(this.bankForm)
          console.log('edit')
        })
      } else if (id === 'null') {
        console.log('add')
      } else {
        this.$message({
          message: errorConfig.ER_PARAMETER,
          type: 'error'
        })
      }
    }
  }
}
</script>
