import DefaultTheme from 'vitepress/theme'
import PdfLibrary from './components/PdfLibrary.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PdfLibrary', PdfLibrary)
  }
}
