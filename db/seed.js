import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const result1 = await db.query(
    `INSERT INTO folders (name) VALUES ($1 ) RETURNING id`,
    ['work']
  );
  const folderId1 = result1.rows[0].id;

  const result2 = await db.query(
    `INSERT INTO folders(name) VALUES ($1) RETURNING id`,
    ['personal']
  );
  const folderId2 = result2.rows[0].id;

  const result3 = await db.query(
      `INSERT INTO folders(name) VALUES($1) returning id`,
    ['business_expenses']
  );
  const folderId3 = result3.rows[0].id;

  //This belongs to folderid1 this is work
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3)`,
    ['resume.pdf', 1024, folderId1]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['cover_letter.pdf', 2048, folderId1]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['personal_statement.pdf', 2093, folderId1]
  );
  await db.query(
    `INSERT INTO files(name, size, folder_id) VALUES ($1, $2, $3)`,
    ['meeting_notes.txt', 234, folderId1]
  );
  await db.query(
      `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
      ['project_plan.doc', 888, folderId1]
  );

 //This belongs to folderid2 this is personal 
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3)`,
    ['vacation_photos.jpg', 1024, folderId2]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['grocery_list.txt', 2048, folderId2]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['journal.doc', 2093, folderId2]
  );
  await db.query(
    `INSERT INTO files(name, size, folder_id) VALUES ($1, $2, $3)`,
    ['recipes.txt', 234, folderId2]
  );
  await db.query(
      `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
      ['birthday_invite.txt', 888, folderId2]
  );

  //This belongs to folderid3 business
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3)`,
    ['tax_return.pdf', 1024, folderId3]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['expense_report.pdf', 2048, folderId3]
  );
  await db.query(
    `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
    ['client_notes.txt', 2093, folderId3]
  );
  await db.query(
    `INSERT INTO files(name, size, folder_id) VALUES ($1, $2, $3)`,
    ['contact.pdf', 234, folderId3]
  );
  await db.query(
      `INSERT INTO files (name, size, folder_id) VALUES($1, $2, $3)`,
      ['runway.pdf', 888, folderId3]
  );
}
