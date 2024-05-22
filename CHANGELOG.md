## [2.1.1](https://github.com/blueprintui/blueprintui/compare/v2.1.0...v2.1.1) (2024-05-22)


### Bug Fixes

* **components:** form controller alignments ([8fc373f](https://github.com/blueprintui/blueprintui/commit/8fc373f6d224573ae66ef51e62c21c8c999001a5))
* **components:** native css anchoring ([62248c1](https://github.com/blueprintui/blueprintui/commit/62248c1a8435264a22178e7e7898dd0e2d76af7b))
* **components:** new css state syntax ([e69165d](https://github.com/blueprintui/blueprintui/commit/e69165d6a69ab5b6d5f67f506d94d70c058b6751))
* **components:** update popover deps ([b96b379](https://github.com/blueprintui/blueprintui/commit/b96b3793b079472afae82574c18c7c3a031a8c7f))

# [2.1.0](https://github.com/blueprintui/blueprintui/compare/v2.0.2...v2.1.0) (2024-02-02)


### Features

* **components:** toggletip ([20b5227](https://github.com/blueprintui/blueprintui/commit/20b5227d7b8efd127b97cc3f4d1a66bab8f4d27c))

## [2.0.2](https://github.com/blueprintui/blueprintui/compare/v2.0.1...v2.0.2) (2024-01-03)


### Bug Fixes

* **components:** remove deprecated dom mutation event ([b0409a7](https://github.com/blueprintui/blueprintui/commit/b0409a713daa8df410f938e057c0a697773a5568))
* **themes:** color contrast for red scale ([0b7f674](https://github.com/blueprintui/blueprintui/commit/0b7f6740a89eeab382cfb8d2e3dfa111a9405c24))

## [2.0.1](https://github.com/blueprintui/blueprintui/compare/v2.0.0...v2.0.1) (2024-01-02)


### Bug Fixes

* **components:** remove unused dependency ([587d935](https://github.com/blueprintui/blueprintui/commit/587d93562b43c906840f58bf727cdaf372389d65))

# [2.0.0](https://github.com/blueprintui/blueprintui/compare/v1.18.2...v2.0.0) (2024-01-01)


### Features

* **themes:** v2 ([1d8a75c](https://github.com/blueprintui/blueprintui/commit/1d8a75cee87d1f322836e90de1e3bafeb8bd2487))


### BREAKING CHANGES

* **themes:** - system light and dark are no longer supported
- popover APIs now implement native HTML Popover APIs
- modern light and default now defaults
- components use new layer scale based system for accurate color contrast
- fix broken label associations
- upgrade to Lit 3.x
- upgrade TypeScript 5.x
- button expand rename action to orientation
- button-icon-group removed in favor of button-group
- default for button-icon is now filled, use action=“flat” for original flat style
- layout module performance improvements with CSS vars. 3.2kb target bundle
- popover types dialog, drawer and toast only anchor to the document window

Signed-off-by: Cory Rylan <cory@coryrylan.com>

## [1.18.2](https://github.com/blueprintui/blueprintui/compare/v1.18.1...v1.18.2) (2023-10-12)


### Bug Fixes

* **build:** commit lint ([f161d36](https://github.com/blueprintui/blueprintui/commit/f161d36255087ac5221c0e51633666828b6c61e1))
* **build:** commit lint rule ([4f54895](https://github.com/blueprintui/blueprintui/commit/4f54895d61cd675eca3a9723e88b7b613025c255))
* **deps:** update lit and typescript ([316e406](https://github.com/blueprintui/blueprintui/commit/316e4068d87b309283c5a5d8dfab3fa5b0baf76e)), closes [#261](https://github.com/blueprintui/blueprintui/issues/261)

## [1.18.1](https://github.com/blueprintui/blueprintui/compare/v1.18.0...v1.18.1) (2023-08-20)


### Bug Fixes

* **docs:** shell nav closable state ([941e36d](https://github.com/blueprintui/blueprintui/commit/941e36d6700b5bad91568f9a511000ce5c66a2fc))
* **typewriter:** initial focus list ([368b294](https://github.com/blueprintui/blueprintui/commit/368b2948ec191800d839d57e9bcf8c3638df08fc))

# [1.18.0](https://github.com/blueprintui/blueprintui/compare/v1.17.4...v1.18.0) (2023-08-15)


### Features

* **components:** alert banner variant ([c2264b1](https://github.com/blueprintui/blueprintui/commit/c2264b199b4b201f7f7b98d1897f57311e930796))

## [1.17.4](https://github.com/blueprintui/blueprintui/compare/v1.17.3...v1.17.4) (2023-08-10)


### Bug Fixes

* **docs:** grid import paths ([31af83a](https://github.com/blueprintui/blueprintui/commit/31af83ab1470129e70b6dbe692bcf19a050d8be6))

## [1.17.3](https://github.com/blueprintui/blueprintui/compare/v1.17.2...v1.17.3) (2023-08-09)


### Bug Fixes

* **components:** doc apis, cleanup empty templates ([73059c3](https://github.com/blueprintui/blueprintui/commit/73059c3914c07415775187261460ac9b8addafea))
* **components:** drawer api and events ([fcdd4d0](https://github.com/blueprintui/blueprintui/commit/fcdd4d0867847b0fd673e8c84f2f33b545994cd9))
* **components:** popover stateless internals ([5c2a9a3](https://github.com/blueprintui/blueprintui/commit/5c2a9a3d3cba2af1d6edad4a35e6bd9b617100c8))

## [1.17.2](https://github.com/blueprintui/blueprintui/compare/v1.17.1...v1.17.2) (2023-08-06)


### Bug Fixes

* **components:** navigation improvements ([45c384d](https://github.com/blueprintui/blueprintui/commit/45c384d5ab2fa47a385d9fbd3b412a2bee2f31e1))

## [1.17.1](https://github.com/blueprintui/blueprintui/compare/v1.17.0...v1.17.1) (2023-08-04)


### Bug Fixes

* **components:** upstream package types ([f8d28a4](https://github.com/blueprintui/blueprintui/commit/f8d28a4f89404384eef50e49a55bcc03179e261e))

# [1.17.0](https://github.com/blueprintui/blueprintui/compare/v1.16.2...v1.17.0) (2023-08-01)


### Features

* **components:** format-datetime ([4cb961c](https://github.com/blueprintui/blueprintui/commit/4cb961ce03c4e0608cdea4b9633bc2b843c27857))
* **components:** format-number ([a7379a1](https://github.com/blueprintui/blueprintui/commit/a7379a1ae383acc0376a1081b59117956ca35c2e))

## [1.16.2](https://github.com/blueprintui/blueprintui/compare/v1.16.1...v1.16.2) (2023-07-25)


### Bug Fixes

* **components:** deploy docs ([0ae7199](https://github.com/blueprintui/blueprintui/commit/0ae7199487ed8df1857bac5eff55b5551a24ba12))
* **components:** test entrypoint ([96b8893](https://github.com/blueprintui/blueprintui/commit/96b8893af747a3afaf0a4adf1ebffb0e98836cfa))

## [1.16.1](https://github.com/blueprintui/blueprintui/compare/v1.16.0...v1.16.1) (2023-07-23)


### Bug Fixes

* **components:** selected color contrast ([eb443ea](https://github.com/blueprintui/blueprintui/commit/eb443ea97fd4bcee5e130d1d123890d36877a273))

# [1.16.0](https://github.com/blueprintui/blueprintui/compare/v1.15.2...v1.16.0) (2023-07-23)


### Features

* **components:** stepper component ([d616696](https://github.com/blueprintui/blueprintui/commit/d616696a1b36f287020646a92bbbcae6f385c899))

## [1.15.2](https://github.com/blueprintui/blueprintui/compare/v1.15.1...v1.15.2) (2023-07-04)


### Bug Fixes

* **components:** improve types ([537e41f](https://github.com/blueprintui/blueprintui/commit/537e41f1b150d9a540517904ec09ee5203c4ddfc))

## [1.15.1](https://github.com/blueprintui/blueprintui/compare/v1.15.0...v1.15.1) (2023-06-25)


### Bug Fixes

* **build:** update cli deps ([8119063](https://github.com/blueprintui/blueprintui/commit/8119063d9b4adf07371ee8fcf9b640957e7e39b7))

# [1.15.0](https://github.com/blueprintui/blueprintui/compare/v1.14.3...v1.15.0) (2023-06-24)


### Features

* **components:** tree component ([b4eac34](https://github.com/blueprintui/blueprintui/commit/b4eac340e15512e6cbb5746be0edefb83b7c4a1d))

## [1.14.3](https://github.com/blueprintui/blueprintui/compare/v1.14.2...v1.14.3) (2023-05-31)


### Bug Fixes

* **docs:** home animation ([11f3bcd](https://github.com/blueprintui/blueprintui/commit/11f3bcd44033ffdb9bc6c1904253796431b60c0e))

## [1.14.2](https://github.com/blueprintui/blueprintui/compare/v1.14.1...v1.14.2) (2023-05-29)


### Bug Fixes

* **components:** add popover trigger support ([e9d3673](https://github.com/blueprintui/blueprintui/commit/e9d36734843754ce1a5666492c0e94664b0fd978))

## [1.14.1](https://github.com/blueprintui/blueprintui/compare/v1.14.0...v1.14.1) (2023-05-17)


### Bug Fixes

* **components:** minor styles chat ([04fa9a0](https://github.com/blueprintui/blueprintui/commit/04fa9a01d4d4d4ba1c3b7dd013ba28530991042c))

# [1.14.0](https://github.com/blueprintui/blueprintui/compare/v1.13.3...v1.14.0) (2023-05-17)


### Features

* **components:** progress-dot, chat-message ([2975739](https://github.com/blueprintui/blueprintui/commit/29757394006cc717ebe0ce27ae4c1acd99b89b97))

## [1.13.3](https://github.com/blueprintui/blueprintui/compare/v1.13.2...v1.13.3) (2023-05-11)


### Bug Fixes

* **grid:** column, popover alignment styles ([3854572](https://github.com/blueprintui/blueprintui/commit/3854572e292dd2afd445643b2fec1bbe41e424a8))

## [1.13.2](https://github.com/blueprintui/blueprintui/compare/v1.13.1...v1.13.2) (2023-05-08)


### Bug Fixes

* **components:** color input ([80789e4](https://github.com/blueprintui/blueprintui/commit/80789e477dfb30fe7dd87929307949b7c6244721))

## [1.13.1](https://github.com/blueprintui/blueprintui/compare/v1.13.0...v1.13.1) (2023-05-08)


### Bug Fixes

* **components:** style fixes ([e0f2af6](https://github.com/blueprintui/blueprintui/commit/e0f2af6f6bf96c3b7a465437548fec24aa522b62))

# [1.13.0](https://github.com/blueprintui/blueprintui/compare/v1.12.0...v1.13.0) (2023-05-01)


### Features

* **layout:** performance improvements css nesting ([fd16461](https://github.com/blueprintui/blueprintui/commit/fd16461bdff229486b749a8c805e47f1e409b87d))

# [1.12.0](https://github.com/blueprintui/blueprintui/compare/v1.11.1...v1.12.0) (2023-04-27)


### Features

* **components:** pagination input ([26fd249](https://github.com/blueprintui/blueprintui/commit/26fd2492541e8293b99015b013fba5ccf2e21ad1))

## [1.11.1](https://github.com/blueprintui/blueprintui/compare/v1.11.0...v1.11.1) (2023-04-25)


### Bug Fixes

* **components:** form control types ([e004382](https://github.com/blueprintui/blueprintui/commit/e00438215c5ea5c74c858d70d82e1ca35cd6d441))

# [1.11.0](https://github.com/blueprintui/blueprintui/compare/v1.10.6...v1.11.0) (2023-04-24)


### Features

* **components:** rating ([45e4191](https://github.com/blueprintui/blueprintui/commit/45e4191a4c1e3e50f1babb4972cd2972b004334d))
* **components:** rating component ([f8b8433](https://github.com/blueprintui/blueprintui/commit/f8b8433ad8ea90652904deae2a841a340ff29890))

## [1.10.6](https://github.com/blueprintui/blueprintui/compare/v1.10.5...v1.10.6) (2023-04-22)


### Bug Fixes

* **docs:** update project readmes ([26ea6ca](https://github.com/blueprintui/blueprintui/commit/26ea6cada05ab02d23e5eee5848817c3ac2527ce))

## [1.10.5](https://github.com/blueprintui/blueprintui/compare/v1.10.4...v1.10.5) (2023-04-22)


### Bug Fixes

* **components:** prevent default id attr override ([69cf3cd](https://github.com/blueprintui/blueprintui/commit/69cf3cd19882cdbc971d1fadf5267cc33c85b271))
* **components:** set form value on checkbox change ([154918f](https://github.com/blueprintui/blueprintui/commit/154918fe48962cd0e50d8a903af5d42163c298b1))
* **docs:** icon viewer ([a289642](https://github.com/blueprintui/blueprintui/commit/a289642e61a07b4d7efb0412d50c4ec34c0de87d))

## [1.10.4](https://github.com/blueprintui/blueprintui/compare/v1.10.3...v1.10.4) (2023-04-21)


### Bug Fixes

* **build:** action provenance ([e1910bc](https://github.com/blueprintui/blueprintui/commit/e1910bc253d0a04c9b9dea321bcd93ab8f939a1a))

## [1.10.3](https://github.com/blueprintui/blueprintui/compare/v1.10.2...v1.10.3) (2023-04-20)


### Bug Fixes

* **build:** action permissions ([9be0f20](https://github.com/blueprintui/blueprintui/commit/9be0f207c9d4259bdbd7234c89531c7496d6264a))
* **build:** npm provenance ([1aa1fd4](https://github.com/blueprintui/blueprintui/commit/1aa1fd4298f5918b9e7d28321c039bd251cbef34))
* **build:** release permission ([7117eb6](https://github.com/blueprintui/blueprintui/commit/7117eb64508e642cfc01a625b83f0389d05ded47))

## [1.10.2](https://github.com/blueprintui/blueprintui/compare/v1.10.1...v1.10.2) (2023-04-15)


### Bug Fixes

* **components:** status icons ([d76ebb2](https://github.com/blueprintui/blueprintui/commit/d76ebb24f13d765a967cfcc8b96dc415d7886eeb))

## [1.10.1](https://github.com/blueprintui/blueprintui/compare/v1.10.0...v1.10.1) (2023-04-08)


### Bug Fixes

* **components:** icon button/menu alignments ([5bdadd3](https://github.com/blueprintui/blueprintui/commit/5bdadd3564dab3ae01589285fdb742c57e1935dc))

# [1.10.0](https://github.com/blueprintui/blueprintui/compare/v1.9.3...v1.10.0) (2023-04-07)


### Features

* **grid:** enable experimental column features ([eca4ec0](https://github.com/blueprintui/blueprintui/commit/eca4ec064c510c8a3a0c1c389b1d941d68af7952))

## [1.9.3](https://github.com/blueprintui/blueprintui/compare/v1.9.2...v1.9.3) (2023-04-04)


### Bug Fixes

* **build:** test port numbers ([76a87df](https://github.com/blueprintui/blueprintui/commit/76a87dfed80202b58262ccf533ee907e9457d9c4))
* **icons:** cleanup icon shapes ([6e06ea9](https://github.com/blueprintui/blueprintui/commit/6e06ea9ae5be1f3134804c998e612d7b7442952a))
* **icons:** remove duplicate svgs ([d3414e4](https://github.com/blueprintui/blueprintui/commit/d3414e461547fd053fb7d43cad34c0f7e9b28853))

## [1.9.2](https://github.com/blueprintui/blueprintui/compare/v1.9.1...v1.9.2) (2023-04-02)


### Bug Fixes

* **themes:** update interactions to color-mix ([25d72d3](https://github.com/blueprintui/blueprintui/commit/25d72d3d8cc7875682bb984a37bf6de2606b5699))

## [1.9.1](https://github.com/blueprintui/blueprintui/compare/v1.9.0...v1.9.1) (2023-03-31)


### Bug Fixes

* **components:** fix anchor position in nav item ([c8f35b9](https://github.com/blueprintui/blueprintui/commit/c8f35b91459db3c6e0cc66bd9322f10d18a82112))

# [1.9.0](https://github.com/blueprintui/blueprintui/compare/v1.8.3...v1.9.0) (2023-03-29)


### Bug Fixes

* **grid:** align column and row style apis ([cca9b6b](https://github.com/blueprintui/blueprintui/commit/cca9b6bfc66c43594f33926e058f46fd03ec4ff6))
* **themes:** modern interaction contrast ([3af0103](https://github.com/blueprintui/blueprintui/commit/3af0103a9c7d949597d4c8197c2a87a36b01a25b))


### Features

* **typewriter:** support custom complex focus ([a85e6cd](https://github.com/blueprintui/blueprintui/commit/a85e6cd3905d18dfe9d79af85e857dc7d1aa7afd))

## [1.8.3](https://github.com/blueprintui/blueprintui/compare/v1.8.2...v1.8.3) (2023-03-19)


### Bug Fixes

* **components:** improve badge/nav text layout ([4c6a9ce](https://github.com/blueprintui/blueprintui/commit/4c6a9cefbe7946b797ef4d041481c42e0a7b28b4))

## [1.8.2](https://github.com/blueprintui/blueprintui/compare/v1.8.1...v1.8.2) (2023-03-19)


### Bug Fixes

* **components:** add missing dependency ([06dff78](https://github.com/blueprintui/blueprintui/commit/06dff784ba60cd64e0e417d3130d5d761711fa74))

## [1.8.1](https://github.com/blueprintui/blueprintui/compare/v1.8.0...v1.8.1) (2023-03-19)


### Bug Fixes

* **components:** improve layer contrast color ([ed0f6d8](https://github.com/blueprintui/blueprintui/commit/ed0f6d8592054b2d4c108ef11159eeb25cac7b41))

# [1.8.0](https://github.com/blueprintui/blueprintui/compare/v1.7.1...v1.8.0) (2023-03-18)


### Features

* **grid:** column alignment ([c52f3dc](https://github.com/blueprintui/blueprintui/commit/c52f3dc39dd05201cefb02b9b1ac3b15f17f4fd4))

## [1.7.1](https://github.com/blueprintui/blueprintui/compare/v1.7.0...v1.7.1) (2023-03-16)


### Bug Fixes

* **docs:** code summary cleanup ([6153372](https://github.com/blueprintui/blueprintui/commit/61533722638bb7e07533a0014ab4449c104a55b8))

# [1.7.0](https://github.com/blueprintui/blueprintui/compare/v1.6.8...v1.7.0) (2023-03-15)


### Bug Fixes

* **components:** anchor pointer styles ([7c16326](https://github.com/blueprintui/blueprintui/commit/7c16326755e5553686276b97cdb89ace70d5af8b))
* **components:** outline for non-click focus ([8b65513](https://github.com/blueprintui/blueprintui/commit/8b65513e36c69bdbe219a40e86c706eb358066cc))
* **components:** remove unused dependency ([5dd4e55](https://github.com/blueprintui/blueprintui/commit/5dd4e55bd7308d5329bd178f5d74d0219dc8588b))


### Features

* **components:** non-text badge ([a96774b](https://github.com/blueprintui/blueprintui/commit/a96774bbb0435be0f26ef1164bb82f1066509563))
* **components:** support animations in popovers ([7b97a41](https://github.com/blueprintui/blueprintui/commit/7b97a4192112eaef2f637fedd9632086595556a6))
* **grid:** improve border and row style options ([ee5f25a](https://github.com/blueprintui/blueprintui/commit/ee5f25a8227f1e38c5f81ad246fe4ebe9393dd83))
* **themes:** add animation tokens ([584d5f6](https://github.com/blueprintui/blueprintui/commit/584d5f66d27c6394dbc3fb31192c7a96db04485d))

## [1.6.8](https://github.com/blueprintui/blueprintui/compare/v1.6.7...v1.6.8) (2023-03-13)


### Bug Fixes

* **components:** checkbox double click event ([f4415f6](https://github.com/blueprintui/blueprintui/commit/f4415f6d9cecc2fb2a296a3a1ab44c19d45069ae))
* **components:** fieldset keynav direction ([680dec0](https://github.com/blueprintui/blueprintui/commit/680dec09c3de8afbd7d43f2ec04069b00e76e690))
* **components:** form slider readonly/disabled ([386dbbc](https://github.com/blueprintui/blueprintui/commit/386dbbce143e9b07a2b96eac8f3cff993995ea09))
* **grid:** controller refactor ([3d73db9](https://github.com/blueprintui/blueprintui/commit/3d73db9c17cbaf3048bc11d00ea4fb8499dd241c))
* **themes:** modarn-dark theme border contrast ([cb2376e](https://github.com/blueprintui/blueprintui/commit/cb2376ea95a6a3ecce37d479e3c8755db1863115))

## [1.6.7](https://github.com/blueprintui/blueprintui/compare/v1.6.6...v1.6.7) (2023-03-03)


### Bug Fixes

* **components:** resize event name ([e76fc46](https://github.com/blueprintui/blueprintui/commit/e76fc46c53956fd67b567a09d921b0e7d7e03527))

## [1.6.6](https://github.com/blueprintui/blueprintui/compare/v1.6.5...v1.6.6) (2023-02-19)


### Bug Fixes

* **components:** form controls ([c10449c](https://github.com/blueprintui/blueprintui/commit/c10449cf432c76d8be8e9953114baa7e6d5dbc0e))

## [1.6.5](https://github.com/blueprintui/blueprintui/compare/v1.6.4...v1.6.5) (2023-02-13)


### Bug Fixes

* **components:** inline version ([188f4d9](https://github.com/blueprintui/blueprintui/commit/188f4d9be96c87d3abf3100121dd3dd8743a6f39))

## [1.6.4](https://github.com/blueprintui/blueprintui/compare/v1.6.3...v1.6.4) (2023-02-13)


### Bug Fixes

* **components:** inline version ([3185b0a](https://github.com/blueprintui/blueprintui/commit/3185b0a312b79f00eb693f0314a95ca2625f9d31))
* **components:** inline version ([e9e7253](https://github.com/blueprintui/blueprintui/commit/e9e72536c00b681a1c98f9bcfe2343dfc01cce08))
* **components:** inline version runtime ([a77aa4e](https://github.com/blueprintui/blueprintui/commit/a77aa4e39488aa28035c438df71b6163f53fe7af))

## [1.6.3](https://github.com/blueprintui/blueprintui/compare/v1.6.2...v1.6.3) (2023-02-13)


### Bug Fixes

* **components:** inline version ([e68ce87](https://github.com/blueprintui/blueprintui/commit/e68ce871b602e6ff6c760c7c9a98af2bc28c802b))

## [1.6.2](https://github.com/blueprintui/blueprintui/compare/v1.6.1...v1.6.2) (2023-02-13)


### Bug Fixes

* **components:** readonly role ([338f6a4](https://github.com/blueprintui/blueprintui/commit/338f6a4c2c8365196f19113031aebd49ae8a547f))

## [1.6.1](https://github.com/blueprintui/blueprintui/compare/v1.6.0...v1.6.1) (2023-02-10)


### Bug Fixes

* **build:** update dependencies ([478433e](https://github.com/blueprintui/blueprintui/commit/478433e7ea17964b7f27e4521636e2de8feb34b1))
* **components:** button base type ([f807628](https://github.com/blueprintui/blueprintui/commit/f8076280b5537208831af3e50d8e8da07abd1814))
* **components:** select width and pagination ([ed7e153](https://github.com/blueprintui/blueprintui/commit/ed7e1538ec8640d8fef367490fb5a7a28a0e2fd6))
* **grid:** pagination page size support ([2c3113f](https://github.com/blueprintui/blueprintui/commit/2c3113fe77bee312859cff09e3880141199b6888))

# [1.6.0](https://github.com/blueprintui/blueprintui/compare/v1.5.1...v1.6.0) (2023-02-09)


### Features

* **components:** expand btn form participation ([825c16b](https://github.com/blueprintui/blueprintui/commit/825c16ba645bc2ca14d6068e0b868397868af2ea))

## [1.5.1](https://github.com/blueprintui/blueprintui/compare/v1.5.0...v1.5.1) (2023-02-08)


### Bug Fixes

* **components:** api metadata ([2077521](https://github.com/blueprintui/blueprintui/commit/2077521408ecc82fad5076d0c976026807f5e946))

# [1.5.0](https://github.com/blueprintui/blueprintui/compare/v1.4.0...v1.5.0) (2023-02-08)


### Features

* **components:** sort button form participation ([c73ee34](https://github.com/blueprintui/blueprintui/commit/c73ee34bddd43fa8ba485c69d07d0b02260d65df))

# [1.4.0](https://github.com/blueprintui/blueprintui/compare/v1.3.1...v1.4.0) (2023-01-31)


### Features

* **themes:** additional color scale values ([ed60433](https://github.com/blueprintui/blueprintui/commit/ed604338cd553d891cc0cf47845407f4b5a2ba40))

## [1.3.1](https://github.com/blueprintui/blueprintui/compare/v1.3.0...v1.3.1) (2023-01-29)


### Bug Fixes

* **crane:** minor cleanup in dom fns ([c069c4e](https://github.com/blueprintui/blueprintui/commit/c069c4e467c88960fb9fde475ffd78fd7f02acee))

# [1.3.0](https://github.com/blueprintui/blueprintui/compare/v1.2.0...v1.3.0) (2023-01-29)


### Features

* **crane:** publish ([3be40fe](https://github.com/blueprintui/blueprintui/commit/3be40fed285136c592f7e35898018d7fe6a1df3d))

# [1.2.0](https://github.com/blueprintui/blueprintui/compare/v1.1.1...v1.2.0) (2023-01-29)


### Features

* **crane:** init controller and component ([ae1ab4f](https://github.com/blueprintui/blueprintui/commit/ae1ab4ff8cc7cb5a9226f05643401d827609a884))

## [1.1.1](https://github.com/blueprintui/blueprintui/compare/v1.1.0...v1.1.1) (2023-01-24)


### Bug Fixes

* **deps:** update license year ([a0c4f7f](https://github.com/blueprintui/blueprintui/commit/a0c4f7f40708b148b335f97998e1cb34f570d2e6))

# [1.1.0](https://github.com/blueprintui/blueprintui/compare/v1.0.3...v1.1.0) (2023-01-10)


### Bug Fixes

* **typewriter:** event name ([ec3cade](https://github.com/blueprintui/blueprintui/commit/ec3cade56ffbf8471655fe02db2ffa5d87413555))


### Features

* **components:** popover trigger events ([03e0c44](https://github.com/blueprintui/blueprintui/commit/03e0c446f8ff58e9e031db2b7fca13e0be516b49))

## [1.0.3](https://github.com/blueprintui/blueprintui/compare/v1.0.2...v1.0.3) (2023-01-08)


### Bug Fixes

* **typography:** link inherit defaults ([0575937](https://github.com/blueprintui/blueprintui/commit/05759379a318982097367b108c05bae062f65ecc))

## [1.0.2](https://github.com/blueprintui/blueprintui/compare/v1.0.1...v1.0.2) (2023-01-08)


### Bug Fixes

* **build:** inline package version for runtime ([4cacfee](https://github.com/blueprintui/blueprintui/commit/4cacfee01e83fa17b0d5beb3df38845a077e6b87))

## [1.0.1](https://github.com/blueprintui/blueprintui/compare/v1.0.0...v1.0.1) (2023-01-08)


### Bug Fixes

* **build:** changelog ([6a9af1f](https://github.com/blueprintui/blueprintui/commit/6a9af1f06c862eb53d0165733957245d4d1112ca))
* **build:** commit lint ([16d7455](https://github.com/blueprintui/blueprintui/commit/16d745550a7a7b729f9efb0b3b7f001578f375cc))
* **build:** commit lint scope ([829e2dd](https://github.com/blueprintui/blueprintui/commit/829e2dd7964f5875622f9f56343bdfddc7e27201))
* **build:** release ([7bb8782](https://github.com/blueprintui/blueprintui/commit/7bb878287946d2aef855e7625f56bef133f8a13f))
* **build:** release path ([35e6bbe](https://github.com/blueprintui/blueprintui/commit/35e6bbe190a52efda0471044fecd9f6ccc89d347))
* **build:** token deployment ([56e9d1c](https://github.com/blueprintui/blueprintui/commit/56e9d1ca1e188de82431000419564a06b40ed77c))
* **build:** update package dependencies ([6875797](https://github.com/blueprintui/blueprintui/commit/6875797affa6fb624a24f577548a6768997a97d0))
* **docs:** changelog ([d4542d9](https://github.com/blueprintui/blueprintui/commit/d4542d982efdbb7d180552f9052619fad338b9b6))


# [1.0.0](https://github.com/blueprintui/blueprintui/compare/2.4.2...v1.0.0) (2023-01-08)

### 0.0.35
- feat: toast component

## 0.0.34
- fix: improve a11y SR labeling for custom form control types
- fix: badge color contrast
- fix: shell scroll padding offset

## 0.0.33
- fix: input focus overflow for action butttons
- fix: cleanup/simplify card/dialog slot APIs
- docs: improve foundation getting started

## 0.0.32
- fix: global define bug with metaurl
- docs: minor form control doc improvements
- docs: pages for support

## 0.0.31
- fix: color eye dropper support (Chrome only)
- fix: drawer position on scrolled page
- docs: improve css prop API documentation

## 0.0.30
- fix: improve select control selecte default behaviors
- fix: radio fieldset group behaviors
- feat: add `valueAsNumber` support to controls
- feat: add `valueAsDate` support to controls

## 0.0.29
- feat: add valueAsNumber support
- feat: add valueAsDate support
- fix: ensure internal native inputs reflect latest control value when set as property

## 0.0.28
- fix: prevent multiple radio group change events from propagation

## 0.0.27
- fix: overflow scroll for modal type popover positions
- feat/breaking: added support for invert layering backgrounds
- feat: added version tracking via `window.bp` global
- chore: update themes breaking change for interaction improvements
- breaking: rename popup instances to popover to align with popover spec
- breaking: prop renames to align with latest theme tokens

## 0.0.26
- fix: auto generate feildset input names
