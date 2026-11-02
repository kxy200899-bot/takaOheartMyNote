<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import pdfs from '../../pdfs.generated.js'

const props = defineProps({
  category: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})

const CATEGORY_ORDER = [
  ['maths-notes', 'Maths Notes'],
  ['general-chemistry', 'General Chemistry'],
  ['python', 'Python'],
  ['personal-essay', 'Personal Essay'],
  ['career-plan', 'Career Plan'],
  ['other', 'Other']
]

const list = computed(() =>
  props.category ? pdfs.filter((p) => p.categoryKey === props.category) : pdfs
)

const groups = computed(() => {
  const buckets = new Map()
  for (const p of list.value) {
    const key = p.categoryKey || 'other'
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key).push(p)
  }
  const order = CATEGORY_ORDER.map(([k]) => k)
  return [...buckets.entries()]
    .sort((a, b) => {
      const ia = order.indexOf(a[0])
      const ib = order.indexOf(b[0])
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
    })
    .map(([key, items]) => ({
      key,
      label: CATEGORY_ORDER.find(([k]) => k === key)?.[1] || items[0].category || key,
      items
    }))
})

function initial(title) {
  const clean = (title || 'PDF').replace(/\s+/g, '')
  return clean.slice(0, 2)
}

function fileName(file) {
  return file.split('/').pop()
}
</script>

<template>
  <div v-if="!list.length" class="pdf-empty">
    还没有 PDF。把整理好的 PDF 放进 <code>docs/public/pdfs/</code>，再运行
    <code>npm run new-pdf</code> 就能收录进来。
  </div>

  <div v-else class="pdf-library" :class="{ compact }">
    <section v-for="group in groups" :key="group.key" class="pdf-group">
      <h2 v-if="!compact" class="pdf-group-title">{{ group.label }}</h2>
      <div class="pdf-grid">
        <article v-for="p in group.items" :key="p.file" class="pdf-card">
          <a
            class="pdf-cover"
            :href="withBase(p.file)"
            target="_blank"
            rel="noopener"
            :aria-label="p.title"
          >
            <img v-if="p.cover" :src="withBase(p.cover)" :alt="p.title" loading="lazy" />
            <span v-else class="pdf-cover-placeholder">
              <span class="pdf-badge">PDF</span>
              <span class="pdf-initial">{{ initial(p.title) }}</span>
            </span>
          </a>

          <div class="pdf-body">
            <span class="pdf-tag">{{ p.category }}</span>
            <h3 class="pdf-title">
              <a :href="withBase(p.file)" target="_blank" rel="noopener">{{ p.title }}</a>
            </h3>
            <p v-if="p.description" class="pdf-desc">{{ p.description }}</p>
            <p class="pdf-meta">{{ p.date }} · {{ p.size }}</p>
            <div class="pdf-actions">
              <a :href="withBase(p.file)" target="_blank" rel="noopener">在线阅读</a>
              <a :href="withBase(p.file)" :download="fileName(p.file)">下载</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pdf-empty {
  padding: 24px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.pdf-group + .pdf-group {
  margin-top: 36px;
}

.pdf-group-title {
  margin: 0 0 16px;
  padding: 0;
  border: none;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-2);
}

.pdf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 18px;
}

.pdf-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.pdf-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-3);
  box-shadow: 0 10px 26px rgba(60, 45, 25, 0.1);
}

.pdf-cover {
  display: block;
  aspect-ratio: 3 / 4;
  background: #fff;
  border-bottom: 1px solid var(--vp-c-divider);
}

.pdf-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.pdf-cover-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  background: linear-gradient(150deg, var(--vp-c-brand-soft), transparent 70%);
}

.pdf-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--vp-c-brand-1);
}

.pdf-initial {
  font-family: ui-serif, Georgia, 'Songti SC', serif;
  font-size: 34px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  opacity: 0.55;
}

.pdf-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 14px 16px 16px;
}

.pdf-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.pdf-title {
  margin: 6px 0 0;
  font-size: 15px;
  line-height: 1.45;
  font-weight: 600;
}

.pdf-title a {
  color: var(--vp-c-text-1);
}

.pdf-title a:hover {
  color: var(--vp-c-brand-1);
}

.pdf-desc {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.pdf-meta {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.pdf-actions {
  display: flex;
  gap: 16px;
  margin-top: auto;
  padding-top: 12px;
  font-size: 13px;
  font-weight: 500;
}

.pdf-actions a {
  color: var(--vp-c-brand-1);
}

.compact .pdf-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
</style>
