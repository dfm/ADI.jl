var documenterSearchIndex = {"docs":
[{"location":"gettingstarted/#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Here is a quick-start guide for people familiar with ADI and experience using tools like VIP or PyKLIP.","category":"page"},{"location":"gettingstarted/#Expected-Data-Formats-1","page":"Getting Started","title":"Expected Data Formats","text":"","category":"section"},{"location":"gettingstarted/#ADI-Cube-1","page":"Getting Started","title":"ADI Cube","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"For standard ADI data, we store the values in a 3-dimensional array, where the first dimension is temporal, and the remaining dimensions are pixel coordinates. This is how most ADI data are stored on disk (typically in FITS files) and allow specifying operations like a tensor.","category":"page"},{"location":"gettingstarted/#Algorithms-1","page":"Getting Started","title":"Algorithms","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"The following algorithms are implemented:","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Median Subtraction\nPCA\nNMF\nGreeDS","category":"page"},{"location":"gettingstarted/#Processing-Patterns-1","page":"Getting Started","title":"Processing Patterns","text":"","category":"section"},{"location":"gettingstarted/#Full-Reduction-1","page":"Getting Started","title":"Full Reduction","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Given an algorithm alg, we can fully process ADI data by calling alg like a function","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"julia> alg = PCA(5)\n\njulia> resid = alg(cube, angles)","category":"page"},{"location":"gettingstarted/#Reduction-Process-1","page":"Getting Started","title":"Reduction Process","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"The process for producing the flat, residual frame follows this general workflow","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Create a cube of the speckle approximation, S\nSubtract S from the data cube to create the residual cube R\nDerotate R frame-by-frame according to the parallactic angle\nCollapse the derotated R","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"In ADI.jl this process looks like this:","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"using HCIToolbox: collapse, derotate\nusing ADI: reconstruct, PCA\n\ncube, angles = # load data\nS = reconstruct(PCA(10), cube, angles)\nR = cube .- S\nR_derotate = derotate(R, angles)\nresid = collapse(R_derotate)\n# or, more succinctly\nresid = collapse(R, angles)","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Notice how the only part of this specific to the algorithm is reconstruct? This lets us have the super-compact functional form from above without having to copy the common code for each algorithm.","category":"page"},{"location":"gettingstarted/#Decomposition-1","page":"Getting Started","title":"Decomposition","text":"","category":"section"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"For certain types of ADI algorithms, a convenient linear form is used for the speckle approximation","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"mathbfS approx mathbfw cdot mathbfA","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"Algorithms which share this attribute share the abstract type ADI.LinearAlgorithm, and we can retrieve these two matrices via decompose.","category":"page"},{"location":"gettingstarted/#","page":"Getting Started","title":"Getting Started","text":"using ADI: decompose, reconstruct, PCA\ncube, angles = # load data\nA, w = decompose(PCA(10), cube, angles)\nS = reconstruct(PCA(10), A, w)\nS == w * A\n# output\ntrue","category":"page"},{"location":"metrics/#Metrics-1","page":"Metrics","title":"Metrics","text":"","category":"section"},{"location":"metrics/#API/Reference-1","page":"Metrics","title":"API/Reference","text":"","category":"section"},{"location":"metrics/#","page":"Metrics","title":"Metrics","text":"Modules = [ADI.Metrics]","category":"page"},{"location":"metrics/#ADI.Metrics","page":"Metrics","title":"ADI.Metrics","text":"ADI.Metrics\n\nThis module provides code for analyzing the results from ADI in a way that is interpretable statistically. Some of the key functionalities are signal-to-noise, significance, the receiver operating characteristic, and the contrast curve.\n\n\n\n\n\n","category":"module"},{"location":"metrics/#ADI.Metrics.significance-Tuple{AbstractArray{T,2} where T,Any}","page":"Metrics","title":"ADI.Metrics.significance","text":"significance(snr::AbstractMatrix, fwhm)\n\nCalculates the Gaussian significance from the signal-to-noise ratio (SNR, S/N).\n\nThe Gaussian signifiance is calculated from converting the SNR confidence limit from a student t distribution to a Gaussian via\n\ntextsig(textSNR) = Phi^-1leftint_0^textSNRt_nu(x)dxright\n\nwhere the degrees of freedom nu is given as 2pi r  Gamma - 2 where r is the radial distance of each pixel from the center of the frame.\n\nSee Also\n\nsnrmap\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.snr-Tuple{AbstractArray{T,2} where T,Any,Any}","page":"Metrics","title":"ADI.Metrics.snr","text":"snr(data, position, fwhm)\n\nCalculate the signal to noise ratio (SNR, S/N) for a test point at position using apertures of diameter fwhm in a residual frame.\n\nUses the method of Mawet et al. 2014 which includes penalties for small sample statistics. These are encoded by using a student's t-test for calculating the SNR.\n\nnote: Note\nSNR is not equivalent to significance, use significance instead\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.snr_approx!-Tuple{AbstractArray{T,2} where T,Any,Any}","page":"Metrics","title":"ADI.Metrics.snr_approx!","text":"snr_approx!(data, position, fwhm)\n\nIn-place version of snr_approx which modifies data.\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.snr_approx-Tuple{Any,Any,Any}","page":"Metrics","title":"ADI.Metrics.snr_approx","text":"snr_approx(data, position, fwhm)\n\nCalculates an approximate signal to noise ratio (SNR, S/N) for a test point at position using apertures of diameter fwhm in a residual frame.\n\nApplies the small sample statistics penalty the same as snr. Data is assumed to have been filtered using a 2D top-hat kernel already (automatically done if called via snrmap)\n\nnote: Note\nSNR is not equivalent to significance, use significance instead.\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.snrmap-Union{Tuple{T}, Tuple{AbstractArray{T,2},Any}} where T","page":"Metrics","title":"ADI.Metrics.snrmap","text":"snrmap(data, fwhm; method=:exact)\n\nParallel implementation of signal-to-noise ratio (SNR, S/N) applied to each pixel in the input image.\n\nSNR Methods\n\n:exact - Uses snr to get the exact SNR using student t statistics (small samples penalty)\n:approx - Convolves the input by a tophat kernel before using snr_approx! to approximate the student t statistics (small samples penalty).\n\ntip: Tip\nThis code is automatically multi-threaded, so be sure to set JULIA_NUM_THREADS before loading your runtime to take advantage of it!\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.contrast_curve-Tuple{Any,Any,Any,Any,Vararg{Any,N} where N}","page":"Metrics","title":"ADI.Metrics.contrast_curve","text":"contrast_curve\n\n\n\n\n\n","category":"method"},{"location":"metrics/#ADI.Metrics.throughput-NTuple{4,Any}","page":"Metrics","title":"ADI.Metrics.throughput","text":"throughput\n\n\n\n\n\n","category":"method"},{"location":"api/#API/Reference-1","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"For now, here is a dump of all documented functions and types.","category":"page"},{"location":"api/#Index-1","page":"API/Reference","title":"Index","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/#API/Reference-2","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"ADI.ADIAlgorithm\nADI.LinearAlgorithm\nreconstruct\ndecompose","category":"page"},{"location":"api/#ADI.ADIAlgorithm","page":"API/Reference","title":"ADI.ADIAlgorithm","text":"ADI.ADIAlgorithm <: Function\n\nThis abstract type is used for defining ADI algorithms. See the extended help (??ADIAlgorithm) for interface details.\n\nExtended help\n\nInterface\n\nTo extend ADIAlgorithm you may implement the following\n\nfunction default description\nreconstruct  Subroutine for creating the full reconstructed cube with the PSF\n(::ADIAlgorithm) subtracts output of reconstruct, then derotates and collapses Subroutine for returning the reduced residual cube\n\n\n\n\n\n","category":"type"},{"location":"api/#ADI.LinearAlgorithm","page":"API/Reference","title":"ADI.LinearAlgorithm","text":"ADI.LinearAlgorithm <: ADI.ADIAlgorithm\n\nThis abstract type is used for defining linear ADI algorithms. See the extended help (??LinearAlgorithm) for interface details.\n\nExtended help\n\nInterface\n\nTo extend LinearAlgorithm you may implement the following\n\nfunction default description\ndecompose  Subroutine for fitting the linear basis and coefficients as unrolled matrices\nreconstruct Computes the inner product of the design matrix and weights from decompose Subroutine for creating the full reconstructed cube with the PSF\n(::LinearAlgorithm) subtracts output of reconstruct, then derotates and collapses Subroutine for returning the reduced residual cube\n\n\n\n\n\n","category":"type"},{"location":"api/#ADI.reconstruct","page":"API/Reference","title":"ADI.reconstruct","text":"reconstruct(::ADIAlgorithm, cube, angles, [cube_ref]; kwargs...)\n\nReconstruct the PSF approximation for the given algorithm, using cube_ref as the reference cube if given.\n\n\n\n\n\n","category":"function"},{"location":"api/#ADI.decompose","page":"API/Reference","title":"ADI.decompose","text":"ADI.decompose(::LinearAlgorithm, cube, angles, [cube_ref]; kwargs...)\n\n\n\n\n\n","category":"function"},{"location":"algorithms/median/#med-1","page":"Median","title":"Median","text":"","category":"section"},{"location":"algorithms/median/#API/Reference-1","page":"Median","title":"API/Reference","text":"","category":"section"},{"location":"algorithms/median/#","page":"Median","title":"Median","text":"Median","category":"page"},{"location":"algorithms/median/#ADI.Median","page":"Median","title":"ADI.Median","text":"Median()\n\nClassic PSF subtraction using the median of entire data cube.\n\nReferences\n\nMarois et al. 2006 Angular Differential Imaging: A Powerful High-Contrast Imaging Technique\n\n\n\n\n\n","category":"type"},{"location":"algorithms/nmf/#nmf-1","page":"NMF","title":"NMF","text":"","category":"section"},{"location":"algorithms/nmf/#API/Reference-1","page":"NMF","title":"API/Reference","text":"","category":"section"},{"location":"algorithms/nmf/#","page":"NMF","title":"NMF","text":"NMF","category":"page"},{"location":"algorithms/nmf/#ADI.NMF","page":"NMF","title":"ADI.NMF","text":"NMF(;ncomps=nothing) <: LinearAlgorithm\n\n\n\n\n\n","category":"type"},{"location":"algorithms/pca/#pca-1","page":"PCA","title":"PCA","text":"","category":"section"},{"location":"algorithms/pca/#API/Reference-1","page":"PCA","title":"API/Reference","text":"","category":"section"},{"location":"algorithms/pca/#","page":"PCA","title":"PCA","text":"PCA\nTPCA","category":"page"},{"location":"algorithms/pca/#ADI.PCA","page":"PCA","title":"ADI.PCA","text":"PCA(;ncomps=nothing, pratio=1) <: LinearAlgorithm\n\nUse principal components analysis (PCA) to form a low-rank orthonormal basis of the input. Uses deterministic singular-value decomposition (SVD) to decompose data.\n\nIf ncomps is nothing, it will be set to the number of frames in the reference cube when processed.\n\nReferences\n\nSoummer, Pueyo, and Larkin (2012) \"Detection and Characterization of Exoplanets and Disks Using Projections on Karhunen-Loève Eigenimages\"\n\nImplements\n\ndecompose\n\n\n\n\n\n","category":"type"},{"location":"algorithms/pca/#ADI.TPCA","page":"PCA","title":"ADI.TPCA","text":"TPCA(;ncomps=nothing) <: LinearAlgorithm\n\nPerform principal components analysis (PCA) using truncated SVD (TSVD; provided by TSVD.jl) instead of deterministic SVD. This is often faster thant PCA but is non-determinstic. We find the differences unnoticable in practice.\n\nIf ncomps is nothing, it will be set to the number of frames in the reference cube when processed.\n\nImplements\n\ndecompose\n\nSee Also\n\nPCA, TSVD.tsvd\n\n\n\n\n\n","category":"type"},{"location":"algorithms/greeds/#greeds-1","page":"GreeDS","title":"GreeDS","text":"","category":"section"},{"location":"algorithms/greeds/#API/Reference-1","page":"GreeDS","title":"API/Reference","text":"","category":"section"},{"location":"algorithms/greeds/#","page":"GreeDS","title":"GreeDS","text":"GreeDS","category":"page"},{"location":"algorithms/greeds/#ADI.GreeDS","page":"GreeDS","title":"ADI.GreeDS","text":"GreeDS(alg=TPCA(); threshold=0.0, progress=true)\n\nPerforms the greedy disk subtraction (GreeDS) algorithm.\n\nThis method is an iterative approach to standard ADI reduction which seeks to minimize over-subtraction by constraining the low-rank matrix approximation from alg.\n\nFor large data cubes the iteration can cause slowdowns, so a progress bar is provided using the ProgressLogging API along with the progress keyword. It won't appear without a logging backend, such as TerminalLoggers.\n\nAlgorithms\n\nAlthough the original paper explicitly uses PCA, we allow use of any linear ADI algorithm that is characterized by ncomps. By default, uses TPCA.\n\nReferences\n\nPairet et al. 2018 \"Reference-less algorithm for circumstellar disks imaging\"\nPairet et al. 2020 \"MAYONNAISE: a morphological components analysis pipeline for circumstellar disks and exoplanets imaging in the near infrared\"\n\n\n\n\n\n","category":"type"},{"location":"#","page":"Home","title":"Home","text":"CurrentModule = ADI","category":"page"},{"location":"#ADI.jl-1","page":"Home","title":"ADI.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: Coverage) (Image: License)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"(Image: DOI)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"A package for angular differential imaging (ADI) along with its variants, such as reference differential imaging (RDI) and spectral differential imaging (SDI).","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"From Julia enter Pkg mode","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia>]\n\n(@v1.5) pkg> add ADI","category":"page"},{"location":"#License-1","page":"Home","title":"License","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This work is distributed under the MIT \"expat\" license. See LICENSE for more information.","category":"page"}]
}
