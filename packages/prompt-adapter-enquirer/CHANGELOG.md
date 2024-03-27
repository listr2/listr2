## @listr2/prompt-adapter-enquirer [2.0.3](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@2.0.2...@listr2/prompt-adapter-enquirer@2.0.3) (2024-03-27)





### Dependencies

* **listr2:** upgraded to 8.1.0

## @listr2/prompt-adapter-enquirer [2.0.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@2.0.1...@listr2/prompt-adapter-enquirer@2.0.2) (2024-01-27)





### Dependencies

* **listr2:** upgraded to 8.0.2

## @listr2/prompt-adapter-enquirer [2.0.1](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@2.0.0...@listr2/prompt-adapter-enquirer@2.0.1) (2023-12-20)





### Dependencies

* **listr2:** upgraded to 8.0.1

# @listr2/prompt-adapter-enquirer [2.0.0](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@1.0.2...@listr2/prompt-adapter-enquirer@2.0.0) (2023-11-24)


### Performance Improvements

* drop node 16 support ([6f4f9f8](https://github.com/listr2/listr2/commit/6f4f9f84564195a8485c44d4862b22fe2323283a))


### BREAKING CHANGES

* node16 is EOL therefore the support is dropped with the minimum
supported version being >= 18.





### Dependencies

* **listr2:** upgraded to 8.0.0

## @listr2/prompt-adapter-enquirer [1.0.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@1.0.1...@listr2/prompt-adapter-enquirer@1.0.2) (2023-10-18)





### Dependencies

* **listr2:** upgraded to 7.0.2

## @listr2/prompt-adapter-enquirer [1.0.1](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@1.0.0...@listr2/prompt-adapter-enquirer@1.0.1) (2023-09-19)


### Bug Fixes

* update badges ([fcd0915](https://github.com/listr2/listr2/commit/fcd0915a30952959140c27b7f82a63cb4eb7fdd5))

# @listr2/prompt-adapter-enquirer 1.0.0 (2023-09-19)


### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))
* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))


### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))
* update linting rules ([1ffb46b](https://github.com/listr2/listr2/commit/1ffb46bf7a62724ee10dc1bd8c5d5f40819945b5))


### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.

# @listr2/prompt-adapter-enquirer [1.0.0-beta.2](https://github.com/listr2/listr2/compare/@listr2/prompt-adapter-enquirer@1.0.0-beta.1...@listr2/prompt-adapter-enquirer@1.0.0-beta.2) (2023-09-19)


### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))

# @listr2/prompt-adapter-enquirer 1.0.0-beta.1 (2023-09-19)


### Bug Fixes

* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))


### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))
* update linting rules ([1ffb46b](https://github.com/listr2/listr2/commit/1ffb46bf7a62724ee10dc1bd8c5d5f40819945b5))


### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.





### Dependencies

* **listr2:** upgraded to 7.0.0-beta.5
