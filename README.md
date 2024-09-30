# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```bash
docker-compose up -d
```

2. Configurar .env con el .env.template

2. Instalar dependencias
```bash
npm install
```

4. Iniciar servidor desarrollo
```bash
npm run dev
```

5. Ejecutar los comandos de Prisma
```bash
npx prisma migrate dev
npx prisma generate
```

6. Ejecutar el SEED para cargar la base de datos local
```bash
localhost:3000/api/seed
```

## Nota: 

__usuario:__ prueba@correo.com
__password:__ 123456

# Prisma commands

```bash
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod


# Stage
