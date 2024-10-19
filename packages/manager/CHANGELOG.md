# @listr2/manager [3.0.0-beta.1](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.13...@listr2/manager@3.0.0-beta.1) (2024-10-19)


### Performance Improvements

* update core dependencies and styling ([56f4d64](https://github.com/listr2/listr2/commit/56f4d647f6020c4227dce8322ec38d030f4897f2))


### BREAKING CHANGES

* This includes breaking changes in the inqurer setup.

The styling is completely changed.





### Dependencies

* **listr2:** upgraded to 9.0.0-beta.1

## @listr2/manager [2.0.13](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.12...@listr2/manager@2.0.13) (2024-10-03)





### Dependencies

* **listr2:** upgraded to 8.2.5

## @listr2/manager [2.0.12](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.11...@listr2/manager@2.0.12) (2024-10-03)


### Bug Fixes

* dont inject options while adding ([778b831](https://github.com/listr2/listr2/commit/778b8319054844f7908d8b64c53694fb94e33ec9)), closes [#727](https://github.com/listr2/listr2/issues/727)

## @listr2/manager [2.0.11](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.10...@listr2/manager@2.0.11) (2024-07-27)





### Dependencies

* **listr2:** upgraded to 8.2.4

## @listr2/manager [2.0.10](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.9...@listr2/manager@2.0.10) (2024-06-21)





### Dependencies

* **listr2:** upgraded to 8.2.3

## @listr2/manager [2.0.9](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.8...@listr2/manager@2.0.9) (2024-06-19)





### Dependencies

* **listr2:** upgraded to 8.2.2

## @listr2/manager [2.0.8](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.7...@listr2/manager@2.0.8) (2024-04-03)





### Dependencies

* **listr2:** upgraded to 8.2.1

## @listr2/manager [2.0.7](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.6...@listr2/manager@2.0.7) (2024-04-02)





### Dependencies

* **listr2:** upgraded to 8.2.0

## @listr2/manager [2.0.6](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.5...@listr2/manager@2.0.6) (2024-03-31)





### Dependencies

* **listr2:** upgraded to 8.1.3

## @listr2/manager [2.0.5](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.4...@listr2/manager@2.0.5) (2024-03-29)





### Dependencies

* **listr2:** upgraded to 8.1.2

## @listr2/manager [2.0.4](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.3...@listr2/manager@2.0.4) (2024-03-27)





### Dependencies

* **listr2:** upgraded to 8.1.1

## @listr2/manager [2.0.3](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.2...@listr2/manager@2.0.3) (2024-03-27)





### Dependencies

* **listr2:** upgraded to 8.1.0

## @listr2/manager [2.0.2](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.1...@listr2/manager@2.0.2) (2024-01-27)





### Dependencies

* **listr2:** upgraded to 8.0.2

## @listr2/manager [2.0.1](https://github.com/listr2/listr2/compare/@listr2/manager@2.0.0...@listr2/manager@2.0.1) (2023-12-20)





### Dependencies

* **listr2:** upgraded to 8.0.1

# @listr2/manager [2.0.0](https://github.com/listr2/listr2/compare/@listr2/manager@1.0.2...@listr2/manager@2.0.0) (2023-11-24)


### Performance Improvements

* drop node 16 support ([6f4f9f8](https://github.com/listr2/listr2/commit/6f4f9f84564195a8485c44d4862b22fe2323283a))


### BREAKING CHANGES

* node16 is EOL therefore the support is dropped with the minimum
supported version being >= 18.





### Dependencies

* **listr2:** upgraded to 8.0.0

## @listr2/manager [1.0.2](https://github.com/listr2/listr2/compare/@listr2/manager@1.0.1...@listr2/manager@1.0.2) (2023-10-18)





### Dependencies

* **listr2:** upgraded to 7.0.2

## @listr2/manager [1.0.1](https://github.com/listr2/listr2/compare/@listr2/manager@1.0.0...@listr2/manager@1.0.1) (2023-09-19)


### Bug Fixes

* update badges ([fcd0915](https://github.com/listr2/listr2/commit/fcd0915a30952959140c27b7f82a63cb4eb7fdd5))

# @listr2/manager 1.0.0 (2023-09-19)


### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))
* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))


### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))


### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.





### Dependencies

* **listr2:** upgraded to 7.0.1

# @listr2/manager [1.0.0-beta.3](https://github.com/listr2/listr2/compare/@listr2/manager@1.0.0-beta.2...@listr2/manager@1.0.0-beta.3) (2023-09-19)


### Bug Fixes

* dont list self as peer due to fixed version ([18f7841](https://github.com/listr2/listr2/commit/18f78416f6d887871a830f3a6cf21ffff29b630d))

# @listr2/manager [1.0.0-beta.2](https://github.com/listr2/listr2/compare/@listr2/manager@1.0.0-beta.1...@listr2/manager@1.0.0-beta.2) (2023-09-19)


### Bug Fixes

* **npm:** add publish config public ([a186982](https://github.com/listr2/listr2/commit/a1869821c94a3b73018a07ba7b721e3523575946))





### Dependencies

* **listr2:** upgraded to 7.0.0-beta.5

# @listr2/manager 1.0.0-beta.1 (2023-09-19)


### Performance Improvements

* **repository:** break in to monorepo ([d830c33](https://github.com/listr2/listr2/commit/d830c338ae8f0ee9e65d4102fc067ffb3e5ac820))


### BREAKING CHANGES

* **repository:** This commit breaks the repository in to a monorepo.

Projects that use `enquirer` requires to install the complimentary adapter `@listr2/prompt-adapter-enquirer`. Since there was a breaking change with this anyway it should be another hassle to tackle.
Projects that use _Manager_ requires to install the complimentary package `@listr2/manager`.





### Dependencies

* **listr2:** upgraded to 7.0.0-beta.4
