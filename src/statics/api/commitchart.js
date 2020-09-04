import { Bar, mixins } from 'vue-chartjs'
const { reactiveData } = mixins
export default {
  extends: Bar,
  mixins: [reactiveData],
  props: ['data'],
  mounted: function () {
    this.renderChart(this.data, this.options)
  },
  computed: {
  },
  data () {
    return {
      options: {
        title: {
          display: true,
          text: 'Graph'
        }
      }
    }
  }
}
