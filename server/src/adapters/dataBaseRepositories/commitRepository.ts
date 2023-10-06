import { Pool } from 'pg'; // Import the Pool from 'pg'
import config from '../../config/db';
import { CommitDTO } from '../../domain/models/CommitDTO';


export class commitRepository{
    pool:Pool
    constructor(){
        this.pool=new Pool(config)
    }
    async saveCommitInfoOfRepo(owner:String,repoName:String,commit:CommitDTO){
        const client = await this.pool.connect();

        const query = 'INSERT INTO commitsTable (owner, repoName, html_url, sha, total,additions,deletions,message,url,comment_count) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10)';
        const values = [owner,repoName,commit.html_url,commit.sha,commit.stats.total,commit.stats.additions,commit.stats.deletions,commit.commit.message,commit.commit.url,commit.commit.comment_count];

        const result = await client.query(query, values);

        client.release();
        return result.rows
    }
}