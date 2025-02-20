# Maglo

## Folder Structure
- `app`: Main app Folder.
  - `core`: Logic related only for `Maglo` project, and can't be used in other projects.
  - `features`: Global Features (eg. Authorization, Settings, Transactions etc.).
  - `shared`: Files that not directly related for `Maglo` project and can be used in other projects.

## File Naming
*General*: 
1. Should describe all functionalities that implemented in.
2. Placed files (components, services, pipes, etc.) in feature, should have the same 
prefix as feature name.
3. Files (components, services, pipes, etc.) placed in `api` folder should end with `-api`.

### Service
1. If service makes only requests, this service name should end with `-api`, 
and should be placed in `api` folder.

### Component
1. If component is modal, it should end with `-modal`
2. If component is page, it should end with `-page`


## Variable Naming

### Interfaces

1. Interfaces that describes body of some request, should have similar name pattern - 
*"MethodName"* + *"EntityName"* + *Body*. (e.g. PostProductBody, PutProductBody).

2. Interfaces that describes query params for request, should have similar name pattern -
*"MethodName"* + *"EntityName"* + *Parameters* (e.g. GetProductParameters).

### Components

1. Loading variable status should have next name pattern - 
*is (if that's correct)* + *"EntityName"* + *Loading* (e.g. productsLoading, isProductLoading etc.)
