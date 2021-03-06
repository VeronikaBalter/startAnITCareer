<template>
    <v-container>
      <v-card class="px-6 py-7">
        <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="false"
      >
        <h1 class="text-left pb-4">Create resume</h1>
        <v-text-field 
          v-model="resume.name"
          outlined 
          label="Job title"
          :rules="validation.title"
          append-icon="mdi-pencil"
        ></v-text-field>
        <v-textarea 
          v-model="resume.about"
          outlined 
          label="About"
          :rules="validation.about"
          append-icon="mdi-pen"
        ></v-textarea>
        <v-flex row  class="ml-1">
        <v-text-field 
          v-model="resume.salary"
          outlined 
          label="Salary from"
          class="pr-2"
          append-icon="mdi-cash"
        ></v-text-field>
        <v-autocomplete 
            v-model="this.resume.currencyId"
            :items="currencies"
            item-text="value"
            item-value="id"
            outlined
            label="Currency"
            class="currency"
        ></v-autocomplete>
        </v-flex>
        <v-autocomplete
            v-model="resume.levelId "
            :items="levels"
            :rules="validation.level"
            item-text="value"
            item-value="id"
            outlined
            label="Level"
        ></v-autocomplete>
        <v-autocomplete
            v-model="resume.typeOfEmploymentId "
            :items="typesOfEmployment"
            :rules="validation.type"
            item-text="value"
            item-value="id"
            outlined
            label="Type of employment"
        ></v-autocomplete>
        <v-autocomplete
            v-model="resume.skills"
            :items="skills"
            :rules="validation.skills"
            item-text="value"
            item-value="id"
            outlined
            chips
            label="Skills"
            multiple
          ></v-autocomplete>
        <v-flex row class="px-4">
          <h3>Languages: </h3>
          <v-btn class="mr-13" color="success" dark small absolute right fab v-on:click="addLanguages">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="error" dark small absolute right fab v-on:click="delLanguages">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-flex>
        <language 
            v-for="(lang, index) in resume.languages" 
            :key="'languag'+index" 
            :language="lang"
            :index ="index+1"
            @lang="langChanged" />
        <v-flex row class="px-4">
          <h3>Education: </h3>
          <v-btn class="mr-13" color="success" dark small absolute right fab v-on:click="addEducation">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="error" dark small absolute right fab v-on:click="delEducation">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-flex>
        <education 
            v-for="(education, index) of resume.education" 
            :key="'education'+index+1" 
            :education="education"
            :index="index"
            @education="educationChanged"/>
        <v-flex row class="px-4">
          <h3>Works experience: </h3>
          <v-btn class="mr-13" color="success" dark small absolute right fab v-on:click="addWork">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="error" dark small absolute right fab v-on:click="delWork">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-flex>
        <workExperience 
            v-for="(workExperience, index) of resume.works" 
            :key="'work'+index" 
            :workExperience="workExperience"
            :index="index"
            @workExperience="workChanged"/>
        <v-btn :disabled="!valid" color="success" v-on:click="send">Send</v-btn>
        </v-form>
      </v-card>
    </v-container>
</template>

<script lang="ts">

import { Component,Vue, Watch, Prop} from 'vue-property-decorator';
import axios from 'axios';
import resume from '@/components/resume.vue'
import ResumeModel from '@/models/resume/ResumeModel'
import currenciesList from '@/const/currencies'
import typesOfEmploymentList from '@/const/typesOfEmployment'
import skillsList from '@/const/skills'
import levelsList from '@/const/levels'
import LanguageModel from '@/models/LanguageModel'
import language from '@/components/Language.vue'
import EducationModel from '@/models/resume/EducationModel'
import education from '@/components/resume/Education.vue'
import WorkExperienceModel from '@/models/resume/WorkExperienceModel'
import workExperience from '@/components/resume/WorkExperience.vue'

@Component({
    components:{
      language,
      education,
      workExperience
    }
})
export default class CreateResume extends Vue {
  private resume: ResumeModel = new ResumeModel;
  private currencies = [];
  private typesOfEmployment = [];
  private skills = [];
  private levels = []

  private valid =true;
  private validation = {
    title:[ (v: string) => !!v || 'Title is required'],
    about:[ (v: string) => !!v || 'About is required'],
    type:[ (v: string) => !!v || 'Type of employment is required'],
    level:[ (v: string) => !!v || 'Level is required'],
  }

  created(){
      this.currencies = currenciesList;
      this.typesOfEmployment = typesOfEmploymentList;
      this.resume.currencyId = currenciesList[0].id;
      this.skills = skillsList;
      this.levels = levelsList;
  }
  get languages(){
    return this.resume.languages;
  }
  private addLanguages(){
    if(this.resume.languages.length<8)
      this.resume.languages.push(new LanguageModel());
  }
  private delLanguages(){
    if(this.resume.languages.length>1)
      this.resume.languages.pop();
  }
  private langChanged(value: LanguageModel, index: number){
    this.resume.languages[index] = value;
  }

  private addEducation(){
    this.resume.education.push(new EducationModel());
  }
  private delEducation(){
    if(this.resume.education.length>1)
      this.resume.education.pop();
  }
  private educationChanged(value: EducationModel, index: number){
    this.resume.education[index] = value;
  }

  private addWork(){
    this.resume.works.push(new WorkExperienceModel());
  }
  private delWork(){
    if(this.resume.works.length>1)
      this.resume.works.pop();
  }
  private workChanged(value: WorkExperienceModel, index: number){
    this.resume.works[index] = value;
  }
  private async send(): Promise<void>{
      var f = this.resume;
      debugger
  } 
}
</script>
<style scoped >
.currency{
    max-width: 200px;
    padding-left:10px ;
}
</style>