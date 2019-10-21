import EntitySet from './EntitySet';
import { decorate, observable, computed } from "mobx"

const children = (cat, cats) => cats.all.filter(c => c.parent === cat.id)

const descendants = (cat, cats) => [
  cat,
  ...children(cat, cats).reduce((a, c) => [...a, ...descendants(c, cats)], [])
]

class AppState {

  items = new EntitySet('item')
  cats = new EntitySet('category')

  selectedCategory = null;

  get itemsInSelectedCategory() {
    return this.items.all.filter(i => i.category === this.selectedCategory.id)
  }

  get allowedParentsForSelectedCategory() {
    //we don't want to be able to create cyclic structures in the graph
    const descendantsAndSelf = new Set(descendants(this.selectedCategory, this.cats))
    return this.cats.all.filter(c => !descendantsAndSelf.has(c))
  }
}

export default decorate(AppState, {
  selectedCategory: observable,
  itemsInSelectedCategory: computed,
  allowedParentsForSelectedCategory: computed
})