# @listr2/manager 1.0.0-beta.1 (2023-09-19)


### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))


### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.





### Dependencies

* **listr2:** upgraded to 7.0.0-beta.4
