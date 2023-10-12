import { GithubAdapter } from "../Repositories/github.API";
import { CommitInformationDataObject } from "../Domain/commitInterfaces";
import { JobDataObject } from "../Domain/jobInterfaces";
import { Request, Response } from 'express';

export class TDDCyclesPort {
  adapter : GithubAdapter
  constructor(){
    this.adapter = new GithubAdapter()
  }

async obtainCommitsOfRepo(req: Request, res: Response): Promise<void> {
    try {
        const owner = String(req.query.owner);
        const repoName = String(req.query.repoName);
        
        if (!owner || !repoName) {
            res.status(400).json({ error: 'Bad request, missing owner or repoName' });
            return;
        }
        const ans = await this.adapter.obtainCommitsOfRepo(owner, repoName);
        res.status(200).json(ans);
    } catch (error) {
        res.status(500).json({ error: 'Server errorr' });
    }
}

  async obtainCommitInformation(owner: string, repoName: string, sha: string): Promise<CommitInformationDataObject> {
    return await this.adapter.obtainCommitsFromSha(owner, repoName, sha);
  }
  async obtainJobsData(owner: string, repoName: string):Promise<Record<string, JobDataObject>> {
    let githubruns=await this.adapter.obtainRunsOfGithubActions(owner,repoName)
    const commitsWithActions: [number,string][] =githubruns.data.workflow_runs.map((workFlowRun:any) => {
      return [workFlowRun.id,workFlowRun.head_commit.id]
    });
    let jobs: Record<string, JobDataObject> = {};
    commitsWithActions.map(async(workflowInfo)=>{
      let jobInfo=await this.adapter.obtainJobsOfACommit(owner,repoName,workflowInfo[0],1)
      jobs[workflowInfo[1]]=jobInfo
    })
    console.log(jobs);
    
    return jobs
  }

}