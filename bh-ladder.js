const ladder = require('./bh-ladder.json');
const members = Object.values(ladder.members)

const ladderTable = [];
members.sort((a, b) => b.local_score - a.local_score).forEach((player, index) => {
  const data = {
    place: index + 1,
    name: player.name ?? `(anonymous user #${player.id})`,
    score: player.local_score,
  };

  Object.values(player.completion_day_level).forEach((day, index) => {
    const diff = day[2] ? day[2].get_star_ts - day[1].get_star_ts : 0;
    data[`day${index + 1}`] = diff ? Math.round(diff / 60) + ':' + (diff % 60) : null;
  });

  ladderTable.push(data);

});
console.table(ladderTable);