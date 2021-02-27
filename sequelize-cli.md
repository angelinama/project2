## wine model

```bash
npx sequelize-cli model:generate --name Wine --attributes wine_name:string,category:string,country:string,region:string,year:integer
```

## user model

```bash
npx sequelize-cli model:generate --name User --attributes user_name:string,email:string,password:string
```
