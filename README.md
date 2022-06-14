# DDD

## Useful links

### Videos

- [SOLID fica FÁCIL com Essas Ilustrações - Filipe Deschamps](https://www.youtube.com/watch?v=6SfrO3D4dHM)

### Articles

- [The S.O.L.I.D Principles in Pictures - Ugonna Thelma](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898)
- [An Introduction to Domain-Driven Design - DDD w/ TypeScript - Khalil Stemmler](https://khalilstemmler.com/articles/domain-driven-design-intro/)

### Books

- [Implementando Domain-Driven Design - Vaughn Vernon](https://www.amazon.com.br/Implementando-Domain-Driven-design-Vernon/dp/8576089521/ref=pd_sbs_sccl_6/144-5534853-6406169?pd_rd_w=OuUf0&pf_rd_p=1eb83ecb-3d38-4c15-9700-c733345d3c82&pf_rd_r=9TZABDK9H0Y2YVMSE9MN&pd_rd_r=d0b15ca6-ffa2-4a2e-9de4-6c0c7bed63cb&pd_rd_wg=xYRSI&pd_rd_i=8576089521&psc=1)

- [Arquitetura limpa: O guia do artesão para estrutura e design de software - Robert C. Martin](https://www.amazon.com.br/Arquitetura-Limpa-Artes%C3%A3o-Estrutura-Software/dp/8550804606/ref=sr_1_1?keywords=arquitetura+limpa&qid=1653314570&s=books&sprefix=arquitetur%2Cstripbooks%2C202&sr=1-1&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9)

### Repositories
- https://github.com/diego3g/umbriel

##

### Creation Order

- [ ] Errors
- [ ] Object Value
  - Uses Errors
- [ ] Domain
  - Uses Object Value
  - Uses Errors
- [ ] Repository Interface-
  - Uses Domain
- [ ] Mappers
  - Domain
- [ ] Repository (ORM)
  - Uses Repository Interface
  - Uses Mapper
- [ ] Use Case
  - Uses Domain
  - Uses Repository Interface
  - Uses Errors
- [ ] Use Case Controller
  - Uses Use Case
- [ ] Controller Factory
  - Uses Repository (ORM)
  - Uses Use Case
  - Uses Use Case Controller
- [ ] Router
  - Use Controller Factory

## Architecture Design

![DDD Architecture](/assets/ddd.jpg)

## Object Values 
- measure
- quantifies
- describe

## TO-DO List Features 
```
- List:
  - Create
  - Update
  - Delete

- item:
  - Create
  - Update
  - Delete

- Domains:
  - List:
    - title                     (255) Text              - Mandatory   - ObjectValue
    - short Description         (255) Text              -             - ObjectValue
    - isActive                  (True/false) Boolean    - Mandatory
    - createdAt                 (date) date-time        - Mandatory
    - updatedAt                 (date) date-time        - Mandatory

  - Item:
    - title                     (255) Text              - Mandatory   - ObjectValue
    - Description               (4000) Text             -             - ObjectValue
    - forecastDate              (date) date-time        -             - EntityRule
    - done                      (True/false) Boolean    - Mandatory
    - createdAt                 (date) date-time        - Mandatory
    - updatedAt                 (date) date-time        - Mandatory


- UseCases:
  - List
    - Create List
    - Update List
    - Update Title
    - Update Description
    - Update Active
    - Delete List
    - Get    List
    - Get    Lists

  - Item
    - Create Item
    - Update Item
    - Update Title
    - Update Description
    - Update Active
    - Delete Item 
    - Get    Item
    - Get    Items
    - Change Done Item
```
