import { GithubRepository } from "../../../../src/modules/TDDCycles/Repositories/GithubRepository";
import { Octokit } from "octokit";
import { commitInformationDataObjectMock, commitInformationMock, githubCommitData, githubResponseData, tddCycleDataObject } from "../../../__mocks__/TDDCycles/dataTypeMocks/githubResponseData";
import { commitsFromGithub } from "../../../__mocks__/TDDCycles/dataTypeMocks/commitData";

describe('GithubRepository', () => {
    let githubRepository: GithubRepository;

    beforeEach(() => {
        githubRepository = new GithubRepository();
    });

    describe('getCommits', () => {
        it('should return an array of commits', async () => {
            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockResolvedValueOnce(githubResponseData),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const owner = 'owner';
            const repoName = 'repoName';

            const commits = await githubRepository.getCommits(owner, repoName);

            expect(commits).toEqual(githubCommitData);
        });

        it('should throw an error if there is an error obtaining commits', async () => {
            const owner = 'owner';
            const repoName = 'repoName';

            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockRejectedValueOnce(new Error('Failed to obtain commits')),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            await expect(githubRepository.getCommits(owner, repoName)).rejects.toThrowError('Failed to obtain commits');
        });

    });
    describe('getCommitInfoForTDDCycle', () => {
        it('should return commit information for a given TDD cycle', async () => {
            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn()
                    .mockResolvedValueOnce({ data: commitInformationDataObjectMock })
                    .mockResolvedValueOnce({ data: [{ body: "Statements | 80% of 100 --- 10 tests passing" }] }),
            } as unknown as Octokit;
            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const owner = 'owner';
            const repoName = 'repoName';
            const sha = 'commitSha';

            const commitInfo = await githubRepository.getCommitInfoForTDDCycle(owner, repoName, sha);
            expect(commitInfo).toEqual(commitInformationMock);
        });

        it('should throw an error if there is an error obtaining commit information', async () => {
            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockRejectedValueOnce(new Error('Failed to obtain commit information')),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const owner = 'owner';
            const repoName = 'repoName';
            const sha = 'commitSha';

            await expect(githubRepository.getCommitInfoForTDDCycle(owner, repoName, sha)).rejects.toThrowError(
                'Failed to obtain commit information'
            );
        });
    });

    describe('getCommitsInforForTDDCycle', () => {
        it('should return an array of TDD cycle data for the given commits', async () => {
            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn()
                    .mockResolvedValueOnce({ data: commitInformationDataObjectMock })
                    .mockResolvedValueOnce({ data: [{ body: "Statements | 80% of 100 --- 10 tests passing" }] }),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const owner = 'owner';
            const repoName = 'repoName';

            const commitsData = await githubRepository.getCommitsInforForTDDCycle(owner, repoName, commitsFromGithub);

            expect(commitsData).toEqual([tddCycleDataObject]);
        });

        it('should throw an error if there is an error obtaining commit information for any commit', async () => {
            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockRejectedValueOnce(new Error('Failed to obtain commit information')),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const owner = 'owner';
            const repoName = 'repoName';

            await expect(githubRepository.getCommitsInforForTDDCycle(owner, repoName, commitsFromGithub)).rejects.toThrowError(
                'Error getting commits from SHA'
            );
        });
    });

    describe('GithubRepository', () => {
        let githubRepository: GithubRepository;

        beforeEach(() => {
            githubRepository = new GithubRepository();
        });

        describe('timeout', () => {
            it('should reject with an error after the specified timeout', async () => {
                const timeoutMs = 1000;

                await expect(githubRepository.timeout(timeoutMs)).rejects.toThrowError('Request timed out');
            });
        });
    });

    describe('GithubRepository', () => {
        let githubRepository: GithubRepository;

        beforeEach(() => {
            githubRepository = new GithubRepository();
        });

        describe('obtainRunsOfGithubActions', () => {
            it('should return the response from the GitHub API', async () => {
                // Create a mock Octokit instance
                const mockOctokit = {
                    request: jest.fn().mockResolvedValueOnce({ data: 'response' }),
                } as unknown as Octokit;

                // Assign the mock Octokit instance to githubRepository.octokit
                githubRepository.octokit = mockOctokit;

                const owner = 'owner';
                const repoName = 'repoName';

                const response = await githubRepository.obtainRunsOfGithubActions(owner, repoName);

                expect(response).toEqual({ data: 'response' });
            });

            it('should throw an error if there is an error obtaining runs', async () => {
                // Create a mock Octokit instance
                const mockOctokit = {
                    request: jest.fn().mockRejectedValueOnce(new Error('Failed to obtain runs')),
                } as unknown as Octokit;

                // Assign the mock Octokit instance to githubRepository.octokit
                githubRepository.octokit = mockOctokit;

                const owner = 'owner';
                const repoName = 'repoName';

                await expect(githubRepository.obtainRunsOfGithubActions(owner, repoName)).rejects.toThrowError('Failed to obtain runs');
            });
        });
    });
    describe('obtainJobsOfACommit', () => {
        it('should return the job data for a given commit', async () => {
            const owner = 'owner';
            const repoName = 'repoName';
            const jobId = 123;
            const attempt = 1;

            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockResolvedValueOnce({
                    data: {
                        total_count: 2,
                        jobs: [{ id: 1, name: 'Job 1' }, { id: 2, name: 'Job 2' }],
                    },
                }),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            const jobData = await githubRepository.obtainJobsOfACommit(owner, repoName, jobId, attempt);

            expect(jobData).toEqual({
                total_count: 2,
                jobs: [{ id: 1, name: 'Job 1' }, { id: 2, name: 'Job 2' }],
            });
        });

        it('should throw an error if there is an error obtaining job data', async () => {
            const owner = 'owner';
            const repoName = 'repoName';
            const jobId = 123;
            const attempt = 1;

            // Create a mock Octokit instance
            const mockOctokit = {
                request: jest.fn().mockRejectedValueOnce(new Error('Failed to obtain job data')),
            } as unknown as Octokit;

            // Assign the mock Octokit instance to githubRepository.octokit
            githubRepository.octokit = mockOctokit;

            await expect(githubRepository.obtainJobsOfACommit(owner, repoName, jobId, attempt)).rejects.toThrowError(
                'Failed to obtain job data'
            );
        });
    });


    describe('getRunsOfGithubActionsIds', () => {
        it('should return an array of commit IDs with their corresponding workflow run IDs', async () => {
            const owner = 'owner';
            const repoName = 'repoName';

            // Create a mock response from the GitHub API
            const mockResponse = {
                data: {
                    workflow_runs: [
                        { head_commit: { id: 'commit1' }, id: 1 },
                        { head_commit: { id: 'commit2' }, id: 2 },
                    ],
                },
            };

            // Mock the obtainRunsOfGithubActions method to return the mock response
            githubRepository.obtainRunsOfGithubActions = jest.fn().mockResolvedValueOnce(mockResponse);

            const runsWithCommitIds = await githubRepository.getRunsOfGithubActionsIds(owner, repoName);

            expect(runsWithCommitIds).toEqual([
                ['commit1', 1],
                ['commit2', 2],
            ]);
        });

        it('should throw an error if there is an error obtaining runs', async () => {
            const owner = 'owner';
            const repoName = 'repoName';

            // Mock the obtainRunsOfGithubActions method to throw an error
            githubRepository.obtainRunsOfGithubActions = jest.fn().mockRejectedValueOnce(new Error('Failed to obtain runs'));

            await expect(githubRepository.getRunsOfGithubActionsIds(owner, repoName)).rejects.toThrowError(
                'Failed to obtain runs'
            );
        });
    });


    describe('getJobsDataFromGithub', () => {
        it('should return a record of job data for each commit', async () => {
            const owner = 'owner';
            const repoName = 'repoName';
            const listOfCommitsWithActions: [string, number][] = [
                ['commit1', 1],
            ];


            // Mock the obtainJobsOfACommit method to return the mock job data object
            githubRepository.obtainJobsOfACommit = jest.fn().mockResolvedValueOnce({ data: { total_count: 10, jobs: 10 } });

            const jobsData = await githubRepository.getJobsDataFromGithub(owner, repoName, listOfCommitsWithActions);

            expect(jobsData).toEqual({ commit1: { data: { total_count: 10, jobs: 10 } } });
        });

        it('should throw an error if there is an error obtaining job data for any commit', async () => {
            const owner = 'owner';
            const repoName = 'repoName';
            const listOfCommitsWithActions: [string, number][] = [
                ['commit1', 1],
                ['commit2', 2],
            ];

            // Mock the obtainJobsOfACommit method to throw an error
            githubRepository.obtainJobsOfACommit = jest.fn().mockRejectedValueOnce(new Error('Failed to obtain job data'));

            await expect(githubRepository.getJobsDataFromGithub(owner, repoName, listOfCommitsWithActions)).rejects.toThrowError(
                'Failed to obtain job data'
            );
        });
    });

});