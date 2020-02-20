export const addFacture = (db, params, cb) => {
  let sql = "INSERT INTO facture VALUES (";
  sql += "NULL, ?, ?)";
  db.run(sql, [params[0], params[1]], err => {
    db.all("SELECT last_insert_rowid();", (err, id) => {
      let sql = "UPDATE travau SET ";
      sql += "IdFact = ? ";
      sql += "WHERE IdTrav = ?";

      for (let i = 0; i < params[2].length; i++) {
        db.run(sql, [id[0]["last_insert_rowid()"], params[2][i].IdTrav]);
      }
      cb(id[0]["last_insert_rowid()"]);
    });
  });
};

export const selectFacture = (db, cb) => {
  let sql = "SELECT facture.IdFact AS IdFact,";
  sql += "facture.IdCli AS IdCli,";
  sql += "facture.DateFact AS DateFact ";
  sql += "FROM facture";

  db.all(sql, (err, rows) => {
    cb(rows);
  });
};

export const updateFacture = (db, params) => {
  let sql = "UPDATE facture SET ";
  sql += "DateFact = ? WHERE IdFact = ?";
  db.run(sql, [params[0], params[1]]);

  sql = "UPDATE travau SET ";
  sql += "IdFact = ? WHERE IdTrav = ?";
};